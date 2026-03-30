import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { supabase } from './supabaseClient.js';
import verifyToken from './authmiddleware.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['https://farm2market-9kq2htvlo-maneesha-garikipatis-projects.vercel.app', 'http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
const Port = process.env.PORT || 5000;



app.post('/register', async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        if (!name || !phone || !password) return res.status(400).json({ message: "All fields are required" });

        // Check if user already exists in Supabase
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('phone', phone)
            .single();

        if (existingUser) return res.status(400).json({ message: "User with this phone already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(),
            name,
            phone,
            password: hashedPassword
        };

        const { error: insertError } = await supabase
            .from('users')
            .insert([newUser]);

        if (insertError) throw insertError;

        res.status(201).json({ message: "Registration successful. Please login." });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) return res.status(400).json({ message: "Phone and password are required" });

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('phone', phone)
            .single();

        if (!user || error) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, name: user.name, phone: user.phone },
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});

app.get('/', (req, res) => {
    res.send('server is running');
});

app.post("/sell", verifyToken, async (req, res) => {
    try {
        const { crop, mandal, village, address } = req.body;

        const { data, error } = await supabase
            .from('products')
            .insert([{
                farmer_id: req.user.id,
                title: crop,
                description: `Mandal: ${mandal}, Village: ${village}, Address: ${address}`,
                price: 0,
                stock_quantity: 0,
                status: 'pending'
            }])
            .select();

        if (error) throw error;

        res.json({
            message: "Sell data saved successfully. Now please verify your details.",
            productId: data[0].id,
            user: req.user
        });
    } catch (error) {
        console.error("Sell error:", error);
        res.status(500).json({ message: "Error saving sell data" });
    }
});
app.post("/confirm-sell", verifyToken, async (req, res) => {
    try {
        const { name, phone, productId } = req.body;

        // Optionally update user name if it changed
        await supabase
            .from('users')
            .update({ name })
            .eq('id', req.user.id);

        if (productId) {
            const { error } = await supabase
                .from('products')
                .update({ status: 'published' })
                .eq('id', productId);

            if (error) throw error;
        }

        res.json({
            message: "Sell confirmed! Your product is now live.",
            user: req.user
        });
    } catch (error) {
        console.error("Confirm sell error:", error);
        res.status(500).json({ message: "Error confirming sell" });
    }
});
app.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
});
