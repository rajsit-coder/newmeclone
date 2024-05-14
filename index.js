const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const axios = require('axios');
async function fetchDataFromAPI(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const ap = [{
        "img": "/images/img1.png",
        "heading": "Dresses",
        "text": "Confidence starts with what you wear",
        "option": ["Maxi Dresses", "Midi Dresses", "Mini Dresses", "Bodycon Dresses", "View All Dresses"],
        "bg_color": "#fff5f5",
        "hr_color": "#fbe7e6"
    },
    {
        "img": "/images/img2.png",
        "heading": "Tops",
        "text": "Amp up your style with our top",
        "option": ["Blouses", "Tshirts", "Shirts", "Tank Tops", "View All Tops"],
        "bg_color": "#f8f6ff",
        "hr_color": "#efecfd"
    },
    {
        "img": "/images/img3.png",
        "heading": "Bottoms",
        "text": "Discover perfects fits for yourself",
        "option": ["Skirts", "Shorts", "Jeans", "Trousers", "View All Bottoms"],
        "bg_color": "#fdfaef",
        "hr_color": "#faf5e1"
    },
    {
        "img": "/images/img4.png",
        "heading": "Co ords",
        "text": "Matching seats that redefine fashion",
        "option": ["Shorts"],
        "bg_color": "#fff5f5",
        "hr_color": "#fbe7e6"
    },
    {
        "img": "/images/img5.png",
        "heading": "Denims",
        "text": "Elevate style with versatile denims",
        "option": ["Paints"],
        "bg_color": "#f3f9ff",
        "hr_color": "#dce9f6"
    },
    {
        "img": "/images/img6.png",
        "heading": "Tshirts",
        "text": "Comfort and stylish T-Shirts",
        "option": ["White"],
        "bg_color": "#fdfaef",
        "hr_color": "#faf5e1"
    },
    {
        "img": "/images/img7.png",
        "heading": "Winterwear",
        "text": "Cosy and stylish winter essentials",
        "option": ["Sweaters", "Sweatshirts", "Coats", "View All Winterwears"],
        "bg_color": "#f8f6ff",
        "hr_color": "#ece8fc"
    },
    {
        "img": "/images/img8.png",
        "heading": "Lingerie",
        "text": "Empower in style with bold lingerie",
        "option": ["Bra", "Bralette", "Slip Dresses", "Matching Sets", "Baby Dolls", "Panties", "View All Lingerie"],
        "bg_color": "#eefaef",
        "hr_color": "#e3f3e5"
    },
    {
        "img": "/images/img9.png",
        "heading": "Jumpsuits/Bodysuits",
        "text": "Express yourself boldly with onesies",
        "option": ["Jumpsuits", "Bodysuits", "Playsuits", "View All Jumpsuits/Bodysuits"],
        "bg_color": "#f3f9ff",
        "hr_color": "#dce9f6"
    }
];

// console.log(ap[1]["img"]);

app.get("/", async(req, res) => {

    const data1 = await fetchDataFromAPI("https://fakestoreapi.com/products?sort=desc");
    const data2 = await fetchDataFromAPI("https://fakestoreapi.com/products/category/women's%20clothing");
    const data3 = await fetchDataFromAPI("https://fakestoreapi.com/products/category/men's%20clothing?sort=desc");
    const data4 = await fetchDataFromAPI("https://fakestoreapi.com/products/category/electronics");
    const data5 = await fetchDataFromAPI("https://fakestoreapi.com/products/category/jewelery?sort=desc");
    const data6 = await fetchDataFromAPI("https://fakestoreapi.com/products?limit=5");
    res.render('index', { products6: data6, products1: data1, products2: data2, products3: data3, products4: data4, products5: data5 });
});

app.get("/shop/:page", async(req, res) => {
    const pageToUrl = {
        '1': "https://fakestoreapi.com/products?sort=desc",
        '2': "https://fakestoreapi.com/products/category/women's%20clothing",
        '3': "https://fakestoreapi.com/products/category/men's%20clothing?sort=desc",
        '4': "https://fakestoreapi.com/products/category/electronics",
        '5': "https://fakestoreapi.com/products/category/jewelery?sort=desc",
        '6': "https://fakestoreapi.com/products"
    };

    const page = req.params['page'];
    const apiUrl = pageToUrl[page];

    if (!apiUrl) {
        return res.status(404).send('Page not found');
    }

    try {
        const data = await fetchDataFromAPI(apiUrl);

        res.render('page_two', { products: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/category", async(req, res) => {
    res.render('page_three', { apis: ap });
    console.log(ap[1]["bg-color"]);
});

app.get("/wishlist", async(req, res) => {
    res.render('page_four');
});


app.get("/profile", async(req, res) => {
    res.render('page_five');
});

app.listen(3000, () => {
    console.log("it's running");
});