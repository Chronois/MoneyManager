/* ============================================================
   MONEY MANAGER — app logic
   ============================================================ */

const SEED = {"transactions": [{"id": 1, "date": "2026-03-02", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 13000, "transferTo": "", "income": 0}, {"id": 2, "date": "2026-03-02", "account": "GoPay", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up HSR", "expense": 176490, "transferTo": "", "income": 0}, {"id": 3, "date": "2026-03-03", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 13000, "transferTo": "", "income": 0}, {"id": 4, "date": "2026-03-04", "account": "BNI", "category": "Daily Necessities", "subcategory": "🫙Food & Drink Container(s)", "note": "Ecentio Kotak Makan", "expense": 37050, "transferTo": "", "income": 0}, {"id": 5, "date": "2026-03-04", "account": "BNI", "category": "Daily Necessities", "subcategory": "🫙Food & Drink Container(s)", "note": "CARA Coffee Tumbler", "expense": 38973, "transferTo": "", "income": 0}, {"id": 6, "date": "2026-03-04", "account": "BNI", "category": "Transportation", "subcategory": "💳E-Money Card", "note": "Kartu Tapcash BNI", "expense": 51274, "transferTo": "", "income": 0}, {"id": 7, "date": "2026-03-04", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 16000, "transferTo": "", "income": 0}, {"id": 8, "date": "2026-03-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "", "expense": 0, "transferTo": "", "income": 0}, {"id": 9, "date": "2026-03-06", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Bukber Staga", "expense": 52000, "transferTo": "", "income": 0}, {"id": 10, "date": "2026-03-06", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Flip", "expense": 326, "transferTo": "", "income": 0}, {"id": 11, "date": "2026-03-06", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Lamongan", "expense": 19000, "transferTo": "", "income": 0}, {"id": 12, "date": "2026-03-07", "account": "BNI", "category": "Transportation", "subcategory": "🚕Car", "note": "Patungan Sewa Mobil", "expense": 50000, "transferTo": "", "income": 0}, {"id": 13, "date": "2026-03-07", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Flip", "expense": 402, "transferTo": "", "income": 0}, {"id": 14, "date": "2026-03-07", "account": "Cash", "category": "Accounts Receivable", "subcategory": "🧾Receivable", "note": "Dari Hilmi", "expense": 0, "transferTo": "", "income": 5000}, {"id": 15, "date": "2026-03-08", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - SPG", "expense": 20000, "transferTo": "", "income": 0}, {"id": 16, "date": "2026-03-08", "account": "BNI", "category": "Clothes", "subcategory": "👕Shirt", "note": "Tris Maroon Hitam - L", "expense": 47127, "transferTo": "", "income": 0}, {"id": 17, "date": "2026-03-08", "account": "BNI", "category": "Clothes", "subcategory": "👖Pants", "note": "NSSTAR Maroon Slimfit - 28", "expense": 67923, "transferTo": "", "income": 0}, {"id": 18, "date": "2026-03-08", "account": "BNI", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Belanja di Griya", "expense": 122934, "transferTo": "", "income": 0}, {"id": 19, "date": "2026-03-09", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 4230000, "transferTo": "SeaBank", "income": 0}, {"id": 20, "date": "2026-03-09", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Flip", "expense": 500, "transferTo": "", "income": 0}, {"id": 21, "date": "2026-03-09", "account": "ShopeePay", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 16000, "transferTo": "SeaBank", "income": 0}, {"id": 22, "date": "2026-03-09", "account": "SeaBank", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "ke Hilmi", "expense": 35000, "transferTo": "", "income": 0}, {"id": 23, "date": "2026-03-09", "account": "BNI", "category": "Transportation", "subcategory": "⛽ Gasoline", "note": "Bensin Mobil", "expense": 10001, "transferTo": "", "income": 0}, {"id": 24, "date": "2026-03-09", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Flip", "expense": 396, "transferTo": "", "income": 0}, {"id": 25, "date": "2026-03-09", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 1769, "transferTo": "BNI", "income": 0}, {"id": 26, "date": "2026-03-09", "account": "GoPay", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "ke Oliv", "expense": 11000, "transferTo": "", "income": 0}, {"id": 27, "date": "2026-03-09", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 13000, "transferTo": "", "income": 0}, {"id": 28, "date": "2026-03-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 290}, {"id": 29, "date": "2026-03-10", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 14000, "transferTo": "", "income": 0}, {"id": 30, "date": "2026-03-11", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 290}, {"id": 31, "date": "2026-03-11", "account": "BNI", "category": "Transportation", "subcategory": "🚐 Travel", "note": "Jatinangor ke Cilegon", "expense": 170000, "transferTo": "", "income": 0}, {"id": 32, "date": "2026-03-11", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Orak-Arik Dadar - Libas", "expense": 15000, "transferTo": "", "income": 0}, {"id": 33, "date": "2026-03-11", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 13000, "transferTo": "", "income": 0}, {"id": 34, "date": "2026-03-12", "account": "BNI", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7500, "transferTo": "", "income": 0}, {"id": 35, "date": "2026-03-12", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 200000, "transferTo": "GoPay", "income": 0}, {"id": 36, "date": "2026-03-12", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 1000, "transferTo": "", "income": 0}, {"id": 37, "date": "2026-03-12", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 291}, {"id": 38, "date": "2026-03-12", "account": "SeaBank", "category": "Transportation", "subcategory": "🚕Car", "note": "Gocar Scam (Macet+100%)", "expense": 190000, "transferTo": "", "income": 0}, {"id": 39, "date": "2026-03-13", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 40, "date": "2026-03-14", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 41, "date": "2026-03-15", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 42, "date": "2026-03-16", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 278}, {"id": 43, "date": "2026-03-16", "account": "GoPay", "category": "Lifestyle", "subcategory": "🔁 Subscription", "note": "Youtube - Raditya Dika", "expense": 22089, "transferTo": "", "income": 0}, {"id": 44, "date": "2026-03-17", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 45, "date": "2026-03-18", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 46, "date": "2026-03-19", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 278}, {"id": 47, "date": "2026-03-20", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 48, "date": "2026-03-20", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 49, "date": "2026-03-20", "account": "ShopeePay", "category": "Bonus", "subcategory": "🪙THR", "note": "Dapet THR", "expense": 0, "transferTo": "", "income": 10}, {"id": 50, "date": "2026-03-21", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 277}, {"id": 51, "date": "2026-03-21", "account": "GoPay", "category": "Bonus", "subcategory": "🪙THR", "note": "Dapet THR", "expense": 0, "transferTo": "", "income": 100}, {"id": 52, "date": "2026-03-21", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 42989, "transferTo": "ShopeePay", "income": 0}, {"id": 53, "date": "2026-03-21", "account": "ShopeePay", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Ngasih THR", "expense": 42999, "transferTo": "", "income": 0}, {"id": 54, "date": "2026-03-21", "account": "ShopeePay", "category": "Bonus", "subcategory": "🪙THR", "note": "Dapet THR", "expense": 0, "transferTo": "", "income": 5161}, {"id": 55, "date": "2026-03-21", "account": "ShopeePay", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Ngasih THR", "expense": 1, "transferTo": "", "income": 0}, {"id": 56, "date": "2026-03-21", "account": "ShopeePay", "category": "Bonus", "subcategory": "🪙THR", "note": "Dapet THR", "expense": 0, "transferTo": "", "income": 100}, {"id": 57, "date": "2026-03-21", "account": "ShopeePay", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 5260, "transferTo": "SeaBank", "income": 0}, {"id": 58, "date": "2026-03-21", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 10000, "transferTo": "ShopeePay", "income": 0}, {"id": 59, "date": "2026-03-21", "account": "ShopeePay", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Ngasih THR", "expense": 10000, "transferTo": "", "income": 0}, {"id": 60, "date": "2026-03-21", "account": "Cash", "category": "Bonus", "subcategory": "🪙THR", "note": "Dapet THR", "expense": 0, "transferTo": "", "income": 320000}, {"id": 61, "date": "2026-03-22", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 274}, {"id": 62, "date": "2026-03-22", "account": "ShopeePay", "category": "Bonus", "subcategory": "🪙THR", "note": "Dapet THR", "expense": 0, "transferTo": "", "income": 1377}, {"id": 63, "date": "2026-03-23", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 274}, {"id": 64, "date": "2026-03-23", "account": "BNI", "category": "Transportation", "subcategory": "🚐 Travel", "note": "Cilegon ke Jatinangor", "expense": 194000, "transferTo": "", "income": 0}, {"id": 65, "date": "2026-03-23", "account": "GoPay", "category": "Daily Necessities", "subcategory": "🌐 Internet", "note": "Beli Kuota 70 GB", "expense": 120000, "transferTo": "", "income": 0}, {"id": 66, "date": "2026-03-24", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 275}, {"id": 67, "date": "2026-03-25", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 274}, {"id": 68, "date": "2026-03-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 274}, {"id": 69, "date": "2026-03-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 275}, {"id": 70, "date": "2026-03-27", "account": "BNI", "category": "Allowance", "subcategory": "💵Allowance", "note": "Dari Papah", "expense": 0, "transferTo": "", "income": 2500000}, {"id": 71, "date": "2026-03-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "💸Game", "note": "Kartu HSR", "expense": 7500, "transferTo": "", "income": 0}, {"id": 72, "date": "2026-03-27", "account": "ShopeePay", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 1377, "transferTo": "SeaBank", "income": 0}, {"id": 73, "date": "2026-03-27", "account": "SeaBank", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "SpayLater", "expense": 21709, "transferTo": "", "income": 0}, {"id": 74, "date": "2026-03-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 153464, "transferTo": "Cash", "income": 0}, {"id": 75, "date": "2026-03-27", "account": "Cash", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Genapin Duit", "expense": 0, "transferTo": "", "income": 1536}, {"id": 76, "date": "2026-03-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "💸Game", "note": "Clip Fan Cooler", "expense": 21480, "transferTo": "", "income": 0}, {"id": 77, "date": "2026-03-28", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 260}, {"id": 78, "date": "2026-03-28", "account": "GoPay", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7500, "transferTo": "", "income": 0}, {"id": 79, "date": "2026-03-28", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam Geprek Rara", "expense": 17000, "transferTo": "", "income": 0}, {"id": 80, "date": "2026-03-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 261}, {"id": 81, "date": "2026-03-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 250000, "transferTo": "Dana", "income": 0}, {"id": 82, "date": "2026-03-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Transfer", "expense": 400, "transferTo": "", "income": 0}, {"id": 83, "date": "2026-03-29", "account": "Dana", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up StarSavior", "expense": 253442, "transferTo": "", "income": 0}, {"id": 84, "date": "2026-03-29", "account": "BNI", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam Geprek Rara", "expense": 17000, "transferTo": "", "income": 0}, {"id": 85, "date": "2026-03-30", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 243}, {"id": 86, "date": "2026-03-30", "account": "SeaBank", "category": "Transportation", "subcategory": "⛽ Gasoline", "note": "Iuran Bensin", "expense": 50000, "transferTo": "", "income": 0}, {"id": 87, "date": "2026-03-30", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 3646477, "transferTo": "SeaBank", "income": 0}, {"id": 88, "date": "2026-03-30", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Transfer", "expense": 2500, "transferTo": "", "income": 0}, {"id": 89, "date": "2026-03-30", "account": "SeaBank", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up HSR", "expense": 56543, "transferTo": "", "income": 0}, {"id": 90, "date": "2026-03-30", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam Goreng", "expense": 20000, "transferTo": "", "income": 0}, {"id": 91, "date": "2026-03-30", "account": "GoPay", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 92, "date": "2026-03-30", "account": "GoPay", "category": "Daily Necessities", "subcategory": "🫖 Water Gallon", "note": "Galon Aqua (Ditalang Ojan)", "expense": 26500, "transferTo": "GoPay", "income": 0}, {"id": 93, "date": "2026-03-30", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Bahan Makanan", "expense": 117618, "transferTo": "", "income": 0}, {"id": 94, "date": "2026-03-30", "account": "GoPay", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 95, "date": "2026-03-31", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 198}, {"id": 96, "date": "2026-03-31", "account": "Cash", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Bubur", "expense": 12000, "transferTo": "", "income": 0}, {"id": 97, "date": "2026-04-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 176}, {"id": 98, "date": "2026-04-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 5000, "transferTo": "", "income": 0}, {"id": 99, "date": "2026-04-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 5000, "transferTo": "BNI 2", "income": 0}, {"id": 100, "date": "2026-04-01", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 172}, {"id": 101, "date": "2026-04-01", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 5000, "transferTo": "", "income": 0}, {"id": 102, "date": "2026-04-01", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 477}, {"id": 103, "date": "2026-04-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 476}, {"id": 104, "date": "2026-04-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 100000, "transferTo": "Dana", "income": 0}, {"id": 105, "date": "2026-04-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Admin", "expense": 400, "transferTo": "", "income": 0}, {"id": 106, "date": "2026-04-02", "account": "Dana", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 90000, "transferTo": "Steam Wallet", "income": 0}, {"id": 107, "date": "2026-04-02", "account": "Steam Wallet", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up StarSavior", "expense": 16828, "transferTo": "", "income": 0}, {"id": 108, "date": "2026-04-03", "account": "Steam Wallet", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up StarSavior", "expense": 16828, "transferTo": "", "income": 0}, {"id": 109, "date": "2026-04-04", "account": "Steam Wallet", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up StarSavior", "expense": 16828, "transferTo": "", "income": 0}, {"id": 110, "date": "2026-04-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 469}, {"id": 111, "date": "2026-04-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 470}, {"id": 112, "date": "2026-04-04", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Es Teh Jumbo", "expense": 6000, "transferTo": "", "income": 0}, {"id": 113, "date": "2026-04-04", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Goreng Ayam", "expense": 15000, "transferTo": "", "income": 0}, {"id": 114, "date": "2026-04-04", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Chocolatte", "expense": 18000, "transferTo": "", "income": 0}, {"id": 115, "date": "2026-04-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 467}, {"id": 116, "date": "2026-04-05", "account": "Cash", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Ayam Fillet Dada", "expense": 56000, "transferTo": "", "income": 0}, {"id": 117, "date": "2026-04-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 467}, {"id": 118, "date": "2026-04-07", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 467}, {"id": 119, "date": "2026-04-08", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 467}, {"id": 120, "date": "2026-04-08", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 20000, "transferTo": "BNI", "income": 0}, {"id": 121, "date": "2026-04-08", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 20000, "transferTo": "Taplus", "income": 0}, {"id": 122, "date": "2026-04-08", "account": "Taplus", "category": "Transportation", "subcategory": "🚌Bus", "note": "Trans Metro Pasundan", "expense": 4900, "transferTo": "", "income": 0}, {"id": 123, "date": "2026-04-08", "account": "GoPay", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 13000, "transferTo": "", "income": 0}, {"id": 124, "date": "2026-04-08", "account": "Cash", "category": "Transportation", "subcategory": "🚌Bus", "note": "Trans Metro Pasundan", "expense": 4000, "transferTo": "", "income": 0}, {"id": 125, "date": "2026-04-08", "account": "Cash", "category": "Daily Necessities", "subcategory": "🛁 Toiletries", "note": "Belanja di Griya", "expense": 242700, "transferTo": "", "income": 0}, {"id": 126, "date": "2026-04-08", "account": "Cash", "category": "Transportation", "subcategory": "🚐 Angkot", "note": "Angkot HIjau", "expense": 5000, "transferTo": "", "income": 0}, {"id": 127, "date": "2026-04-08", "account": "Cash", "category": "Transportation", "subcategory": "🚌Bus", "note": "Angkot Coklat", "expense": 4000, "transferTo": "", "income": 0}, {"id": 128, "date": "2026-04-09", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 465}, {"id": 129, "date": "2026-04-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 466}, {"id": 130, "date": "2026-04-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Muncak + Bioskop", "expense": 66000, "transferTo": "", "income": 0}, {"id": 131, "date": "2026-04-11", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 461}, {"id": 132, "date": "2026-04-11", "account": "GoPay", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 133, "date": "2026-04-11", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Beras + Cemilan", "expense": 112108, "transferTo": "", "income": 0}, {"id": 134, "date": "2026-04-11", "account": "GoPay", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 135, "date": "2026-04-12", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 454}, {"id": 136, "date": "2026-04-12", "account": "Cash", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Ayam Fillet Dada", "expense": 54000, "transferTo": "", "income": 0}, {"id": 137, "date": "2026-04-13", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 453}, {"id": 138, "date": "2026-04-13", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 100000, "transferTo": "Dana", "income": 0}, {"id": 139, "date": "2026-04-13", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Admin", "expense": 400, "transferTo": "", "income": 0}, {"id": 140, "date": "2026-04-13", "account": "Dana", "category": "Lifestyle", "subcategory": "💸Game", "note": "Plague Inc", "expense": 72950, "transferTo": "", "income": 0}, {"id": 141, "date": "2026-04-13", "account": "Steam Wallet", "category": "Lifestyle", "subcategory": "💸Game", "note": "Plague Inc", "expense": 39516, "transferTo": "", "income": 0}, {"id": 142, "date": "2026-04-13", "account": "SeaBank", "category": "Clothes", "subcategory": "🥼Functional Clothing", "note": "Jas Hujan", "expense": 10000, "transferTo": "", "income": 0}, {"id": 143, "date": "2026-04-14", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 446}, {"id": 144, "date": "2026-04-14", "account": "SeaBank", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "Ke Ojan (Ayam Richeese)", "expense": 37000, "transferTo": "", "income": 0}, {"id": 145, "date": "2026-04-14", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🫖 Water Gallon", "note": "Galon Aqua", "expense": 26500, "transferTo": "", "income": 0}, {"id": 146, "date": "2026-04-15", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 442}, {"id": 147, "date": "2026-04-15", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Daging Sapi Gilling (1 kg)", "expense": 118000, "transferTo": "", "income": 0}, {"id": 148, "date": "2026-04-16", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 434}, {"id": 149, "date": "2026-04-16", "account": "SeaBank", "category": "Accounts Receivable", "subcategory": "🧾Receivable", "note": "Barengan beras dengan Ibey", "expense": 0, "transferTo": "", "income": 25000}, {"id": 150, "date": "2026-04-17", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 435}, {"id": 151, "date": "2026-04-18", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 435}, {"id": 152, "date": "2026-04-18", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🌐 Internet", "note": "Beli Kuota 65 GB", "expense": 100000, "transferTo": "", "income": 0}, {"id": 153, "date": "2026-04-18", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Ngopi", "expense": 15000, "transferTo": "", "income": 0}, {"id": 154, "date": "2026-04-19", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 428}, {"id": 155, "date": "2026-04-19", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Belanja di Griya", "expense": 124309, "transferTo": "", "income": 0}, {"id": 156, "date": "2026-04-19", "account": "Cash", "category": "Transportation", "subcategory": "🅿️ Parking", "note": "Parkir", "expense": 4000, "transferTo": "", "income": 0}, {"id": 157, "date": "2026-04-20", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 419}, {"id": 158, "date": "2026-04-21", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 419}, {"id": 159, "date": "2026-04-22", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 419}, {"id": 160, "date": "2026-04-22", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Dada Ayam Giling 1 kg", "expense": 51000, "transferTo": "", "income": 0}, {"id": 161, "date": "2026-04-22", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 21500, "transferTo": "Cash", "income": 0}, {"id": 162, "date": "2026-04-23", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 415}, {"id": 163, "date": "2026-04-23", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Tiket?", "expense": 505, "transferTo": "", "income": 0}, {"id": 164, "date": "2026-04-23", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Belanja di Griya", "expense": 94472, "transferTo": "", "income": 0}, {"id": 165, "date": "2026-04-24", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 407}, {"id": 166, "date": "2026-04-24", "account": "SeaBank", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up HSR", "expense": 55112, "transferTo": "", "income": 0}, {"id": 167, "date": "2026-04-24", "account": "GoPay", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up HSR", "expense": 5550, "transferTo": "", "income": 0}, {"id": 168, "date": "2026-04-25", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 404}, {"id": 169, "date": "2026-04-25", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Es Teh  ", "expense": 7000, "transferTo": "", "income": 0}, {"id": 170, "date": "2026-04-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 404}, {"id": 171, "date": "2026-04-26", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Sate Usus", "expense": 2000, "transferTo": "", "income": 0}, {"id": 172, "date": "2026-04-26", "account": "Cash", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Karaage", "expense": 35000, "transferTo": "", "income": 0}, {"id": 173, "date": "2026-04-26", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam Bakar", "expense": 18000, "transferTo": "", "income": 0}, {"id": 174, "date": "2026-04-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 402}, {"id": 175, "date": "2026-04-27", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Magelangan", "expense": 14000, "transferTo": "", "income": 0}, {"id": 176, "date": "2026-04-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Tiket Elfest", "expense": 154000, "transferTo": "", "income": 0}, {"id": 177, "date": "2026-04-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Berendam di Cipanas", "expense": 35000, "transferTo": "", "income": 0}, {"id": 178, "date": "2026-04-27", "account": "SeaBank", "category": "Transportation", "subcategory": "⛽ Gasoline", "note": "Bensin Mobil", "expense": 19000, "transferTo": "", "income": 0}, {"id": 179, "date": "2026-04-27", "account": "SeaBank", "category": "Transportation", "subcategory": "🚕Car", "note": "Sewa Mobil + Parkir", "expense": 46100, "transferTo": "", "income": 0}, {"id": 180, "date": "2026-04-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 100000, "transferTo": "GoPay", "income": 0}, {"id": 181, "date": "2026-04-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Admin", "expense": 1000, "transferTo": "", "income": 0}, {"id": 182, "date": "2026-04-27", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Aqua", "expense": 10000, "transferTo": "", "income": 0}, {"id": 183, "date": "2026-04-27", "account": "GoPay", "category": "Lifestyle", "subcategory": "🔁 Subscription", "note": "Youtube - Raditya Dika", "expense": 22089, "transferTo": "", "income": 0}, {"id": 184, "date": "2026-04-28", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 377}, {"id": 185, "date": "2026-04-28", "account": "BNI", "category": "Allowance", "subcategory": "💵Allowance", "note": "Dari Papah", "expense": 0, "transferTo": "", "income": 2500000}, {"id": 186, "date": "2026-04-28", "account": "GoPay", "category": "Transportation", "subcategory": "⛽ Gasoline", "note": "Iuran Bensin", "expense": 12500, "transferTo": "", "income": 0}, {"id": 187, "date": "2026-04-28", "account": "BNI", "category": "Lifestyle", "subcategory": "💸Game", "note": "Top Up HSR", "expense": 274066, "transferTo": "", "income": 0}, {"id": 188, "date": "2026-04-28", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 2213610, "transferTo": "SeaBank", "income": 0}, {"id": 189, "date": "2026-04-28", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Admin", "expense": 2500, "transferTo": "", "income": 0}, {"id": 190, "date": "2026-04-28", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 5000, "transferTo": "BNI 2", "income": 0}, {"id": 191, "date": "2026-04-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 529}, {"id": 192, "date": "2026-04-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak Bunga", "expense": 105, "transferTo": "", "income": 0}, {"id": 193, "date": "2026-04-29", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧾 Household Contribution", "note": "Iuran Kontrakan", "expense": 15000, "transferTo": "", "income": 0}, {"id": 194, "date": "2026-04-30", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 527}, {"id": 195, "date": "2026-04-30", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak Bunga", "expense": 105, "transferTo": "", "income": 0}, {"id": 196, "date": "2026-04-30", "account": "SeaBank", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "ke Hilmi", "expense": 25000, "transferTo": "", "income": 0}, {"id": 197, "date": "2026-04-30", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Daging Sapi Gilling (1 kg)", "expense": 103000, "transferTo": "", "income": 0}, {"id": 198, "date": "2026-04-30", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Basreng", "expense": 15000, "transferTo": "", "income": 0}, {"id": 199, "date": "2026-05-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Admin", "expense": 5000, "transferTo": "", "income": 0}, {"id": 200, "date": "2026-05-01", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Admin", "expense": 5000, "transferTo": "", "income": 0}, {"id": 201, "date": "2026-05-01", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 518}, {"id": 202, "date": "2026-05-01", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak Bunga", "expense": 103, "transferTo": "", "income": 0}, {"id": 203, "date": "2026-05-01", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Indomie", "expense": 8000, "transferTo": "", "income": 0}, {"id": 204, "date": "2026-05-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 518}, {"id": 205, "date": "2026-05-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak Bunga", "expense": 103, "transferTo": "", "income": 0}, {"id": 206, "date": "2026-05-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 518}, {"id": 207, "date": "2026-05-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak Bunga", "expense": 103, "transferTo": "", "income": 0}, {"id": 208, "date": "2026-05-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 518}, {"id": 209, "date": "2026-05-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak Bunga", "expense": 103, "transferTo": "", "income": 0}, {"id": 210, "date": "2026-05-04", "account": "GoPay", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "Ke Ariq", "expense": 30000, "transferTo": "", "income": 0}, {"id": 211, "date": "2026-05-04", "account": "GoPay", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "Ke Jesslyn", "expense": 15000, "transferTo": "", "income": 0}, {"id": 212, "date": "2026-05-04", "account": "SeaBank", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "ke Hilmi", "expense": 86250, "transferTo": "", "income": 0}, {"id": 213, "date": "2026-05-04", "account": "SeaBank", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "Ke Fauzan", "expense": 72500, "transferTo": "", "income": 0}, {"id": 214, "date": "2026-05-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 507}, {"id": 215, "date": "2026-05-05", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Makan Siang", "expense": 15000, "transferTo": "", "income": 0}, {"id": 216, "date": "2026-05-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 506}, {"id": 217, "date": "2026-05-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 100000, "transferTo": "GoPay", "income": 0}, {"id": 218, "date": "2026-05-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Biaya Admin", "expense": 1000, "transferTo": "", "income": 0}, {"id": 219, "date": "2026-05-06", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Roti", "expense": 30725, "transferTo": "", "income": 0}, {"id": 220, "date": "2026-05-07", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 499}, {"id": 221, "date": "2026-05-08", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 499}, {"id": 222, "date": "2026-05-08", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 15000, "transferTo": "", "income": 0}, {"id": 223, "date": "2026-05-08", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Telur 8 Butir", "expense": 14500, "transferTo": "", "income": 0}, {"id": 224, "date": "2026-05-09", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 498}, {"id": 225, "date": "2026-05-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Beras  ", "expense": 37250, "transferTo": "", "income": 0}, {"id": 226, "date": "2026-05-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Saus Teriyaki", "expense": 19750, "transferTo": "", "income": 0}, {"id": 227, "date": "2026-05-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 493}, {"id": 228, "date": "2026-05-10", "account": "Cash", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Ayam Fillet Dada", "expense": 56600, "transferTo": "", "income": 0}, {"id": 229, "date": "2026-05-11", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 493}, {"id": 230, "date": "2026-05-11", "account": "Cash", "category": "Bonus", "subcategory": "👛Bonus", "note": "Uang Kaget", "expense": 0, "transferTo": "", "income": 50000}, {"id": 231, "date": "2026-05-12", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 494}, {"id": 232, "date": "2026-05-12", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam Goreng", "expense": 12000, "transferTo": "", "income": 0}, {"id": 233, "date": "2026-05-13", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 493}, {"id": 234, "date": "2026-05-13", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🌐 Internet", "note": "Beli Kuota 65 GB", "expense": 100000, "transferTo": "", "income": 0}, {"id": 235, "date": "2026-05-13", "account": "SeaBank", "category": "Lifestyle", "subcategory": "💸Game", "note": "Nameless Glory - HSR", "expense": 329000, "transferTo": "", "income": 0}, {"id": 236, "date": "2026-05-13", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 15000, "transferTo": "", "income": 0}, {"id": 237, "date": "2026-05-13", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Telur 8 Butir", "expense": 14500, "transferTo": "", "income": 0}, {"id": 238, "date": "2026-05-14", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 461}, {"id": 239, "date": "2026-05-14", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 15000, "transferTo": "", "income": 0}, {"id": 240, "date": "2026-05-15", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 460}, {"id": 241, "date": "2026-05-16", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 460}, {"id": 242, "date": "2026-05-16", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam", "expense": 18500, "transferTo": "", "income": 0}, {"id": 243, "date": "2026-05-17", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 459}, {"id": 244, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 245, "date": "2026-05-17", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🛁 Toiletries", "note": "Sisir Rambut Oval", "expense": 9747, "transferTo": "", "income": 0}, {"id": 246, "date": "2026-05-17", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Sisir Rambut Balisong", "expense": 17005, "transferTo": "", "income": 0}, {"id": 247, "date": "2026-05-17", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Gantungan Kunci S.A.M", "expense": 9401, "transferTo": "", "income": 0}, {"id": 248, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 14800, "transferTo": "", "income": 0}, {"id": 249, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 14800, "transferTo": "", "income": 0}, {"id": 250, "date": "2026-05-17", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧾 Household Contribution", "note": "Plastik Kresek x2", "expense": 600, "transferTo": "", "income": 0}, {"id": 251, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Richeese Crunchy Bubble 450gr", "expense": 32950, "transferTo": "", "income": 0}, {"id": 252, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Piattos Keju", "expense": 9750, "transferTo": "", "income": 0}, {"id": 253, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Telur Omega 10 Butir", "expense": 28950, "transferTo": "", "income": 0}, {"id": 254, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Roti Kopi", "expense": 8000, "transferTo": "", "income": 0}, {"id": 255, "date": "2026-05-17", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🛁 Toiletries", "note": "Sabun Zen", "expense": 40500, "transferTo": "", "income": 0}, {"id": 256, "date": "2026-05-17", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🛁 Toiletries", "note": "Sampo Zinc", "expense": 39900, "transferTo": "", "income": 0}, {"id": 257, "date": "2026-05-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍌Fruits", "note": "Pisang Sunpride", "expense": 28137, "transferTo": "", "income": 0}, {"id": 258, "date": "2026-05-17", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7500, "transferTo": "", "income": 0}, {"id": 259, "date": "2026-05-18", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 441}, {"id": 260, "date": "2026-05-19", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 440}, {"id": 261, "date": "2026-05-20", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 440}, {"id": 262, "date": "2026-05-21", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 440}, {"id": 263, "date": "2026-05-21", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Air + Cemilan", "expense": 27500, "transferTo": "", "income": 0}, {"id": 264, "date": "2026-05-21", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Indomie Jumbo", "expense": 13500, "transferTo": "", "income": 0}, {"id": 265, "date": "2026-05-21", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Kupat Tahu", "expense": 15500, "transferTo": "", "income": 0}, {"id": 266, "date": "2026-05-21", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Steak Chicken Double", "expense": 44000, "transferTo": "", "income": 0}, {"id": 267, "date": "2026-05-22", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 434}, {"id": 268, "date": "2026-05-23", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 433}, {"id": 269, "date": "2026-05-23", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Elok", "expense": 18000, "transferTo": "", "income": 0}, {"id": 270, "date": "2026-05-23", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 13000, "transferTo": "", "income": 0}, {"id": 271, "date": "2026-05-23", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Bootcamp Fapet", "expense": 12000, "transferTo": "", "income": 0}, {"id": 272, "date": "2026-05-23", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Pecel Lele 88", "expense": 18000, "transferTo": "", "income": 0}, {"id": 273, "date": "2026-05-24", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 431}, {"id": 274, "date": "2026-05-24", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 15000, "transferTo": "", "income": 0}, {"id": 275, "date": "2026-05-24", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Telur 8 Butir", "expense": 14500, "transferTo": "", "income": 0}, {"id": 276, "date": "2026-05-24", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Cemilan", "expense": 6000, "transferTo": "", "income": 0}, {"id": 277, "date": "2026-05-25", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 426}, {"id": 278, "date": "2026-05-25", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 13000, "transferTo": "", "income": 0}, {"id": 279, "date": "2026-05-25", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 15000, "transferTo": "", "income": 0}, {"id": 280, "date": "2026-05-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 425}, {"id": 281, "date": "2026-05-26", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 15000, "transferTo": "", "income": 0}, {"id": 282, "date": "2026-05-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 425}, {"id": 283, "date": "2026-05-27", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Roti Bakar - Asjad", "expense": 38800, "transferTo": "", "income": 0}, {"id": 284, "date": "2026-05-28", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 424}, {"id": 285, "date": "2026-05-28", "account": "BNI", "category": "Allowance", "subcategory": "💵Allowance", "note": "Dari Papah", "expense": 0, "transferTo": "", "income": 2500000}, {"id": 286, "date": "2026-05-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 424}, {"id": 287, "date": "2026-05-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 100000, "transferTo": "GoPay", "income": 0}, {"id": 288, "date": "2026-05-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 1000, "transferTo": "", "income": 0}, {"id": 289, "date": "2026-05-29", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam & Sapi - Sei", "expense": 58979, "transferTo": "", "income": 0}, {"id": 290, "date": "2026-05-29", "account": "BNI", "category": "Lifestyle", "subcategory": "💸Game", "note": "Express Supply Pass - HSR", "expense": 69624, "transferTo": "", "income": 0}, {"id": 291, "date": "2026-05-29", "account": "BNI", "category": "Lifestyle", "subcategory": "💸Game", "note": "980 Oneiric Shard - HSR", "expense": 214822, "transferTo": "", "income": 0}, {"id": 292, "date": "2026-05-29", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 5000, "transferTo": "BNI 2", "income": 0}, {"id": 293, "date": "2026-05-29", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 2203226, "transferTo": "SeaBank", "income": 0}, {"id": 294, "date": "2026-05-29", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 2500, "transferTo": "", "income": 0}, {"id": 295, "date": "2026-05-29", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 172, "transferTo": "BNI", "income": 0}, {"id": 296, "date": "2026-05-30", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🫖 Water Gallon", "note": "Galon Aqua", "expense": 26500, "transferTo": "", "income": 0}, {"id": 297, "date": "2026-05-30", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 566}, {"id": 298, "date": "2026-05-30", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 113, "transferTo": "", "income": 0}, {"id": 299, "date": "2026-05-30", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 300, "date": "2026-05-30", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Geprek Rara", "expense": 22000, "transferTo": "", "income": 0}, {"id": 301, "date": "2026-05-31", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 564}, {"id": 302, "date": "2026-05-31", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 112, "transferTo": "", "income": 0}, {"id": 303, "date": "2026-05-31", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 15000, "transferTo": "", "income": 0}, {"id": 304, "date": "2026-06-01", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 563}, {"id": 305, "date": "2026-06-01", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 112, "transferTo": "", "income": 0}, {"id": 306, "date": "2026-06-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 5000, "transferTo": "", "income": 0}, {"id": 307, "date": "2026-06-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 8}, {"id": 308, "date": "2026-06-01", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 309, "date": "2026-06-01", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧾 Household Contribution", "note": "Iuran Kontrakan", "expense": 89000, "transferTo": "", "income": 0}, {"id": 310, "date": "2026-06-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 555}, {"id": 311, "date": "2026-06-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 111, "transferTo": "", "income": 0}, {"id": 312, "date": "2026-06-02", "account": "Cash", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Bubur Ayam", "expense": 12000, "transferTo": "", "income": 0}, {"id": 313, "date": "2026-06-02", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - De Chick", "expense": 18000, "transferTo": "", "income": 0}, {"id": 314, "date": "2026-06-02", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 315, "date": "2026-06-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 555}, {"id": 316, "date": "2026-06-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 110, "transferTo": "", "income": 0}, {"id": 317, "date": "2026-06-03", "account": "Cash", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Bubur Ayam", "expense": 12000, "transferTo": "", "income": 0}, {"id": 318, "date": "2026-06-03", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Beras", "expense": 74500, "transferTo": "", "income": 0}, {"id": 319, "date": "2026-06-03", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - De Chick", "expense": 18000, "transferTo": "", "income": 0}, {"id": 320, "date": "2026-06-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 547}, {"id": 321, "date": "2026-06-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 109, "transferTo": "", "income": 0}, {"id": 322, "date": "2026-06-04", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 323, "date": "2026-06-04", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Sate + Nasi", "expense": 20000, "transferTo": "", "income": 0}, {"id": 324, "date": "2026-06-04", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Mix Platter", "expense": 78540, "transferTo": "", "income": 0}, {"id": 325, "date": "2026-06-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 539}, {"id": 326, "date": "2026-06-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 107, "transferTo": "", "income": 0}, {"id": 327, "date": "2026-06-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Iuran Jalan-jalan", "expense": 89000, "transferTo": "", "income": 0}, {"id": 328, "date": "2026-06-05", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - Geprek Rara", "expense": 13000, "transferTo": "", "income": 0}, {"id": 329, "date": "2026-06-05", "account": "GoPay", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "Ke Oliv", "expense": 22500, "transferTo": "", "income": 0}, {"id": 330, "date": "2026-06-05", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - Geprek Rara", "expense": 13000, "transferTo": "", "income": 0}, {"id": 331, "date": "2026-06-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 532}, {"id": 332, "date": "2026-06-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 106, "transferTo": "", "income": 0}, {"id": 333, "date": "2026-06-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 334, "date": "2026-06-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - Geprek Rara", "expense": 13000, "transferTo": "", "income": 0}, {"id": 335, "date": "2026-06-07", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 530}, {"id": 336, "date": "2026-06-07", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 106, "transferTo": "", "income": 0}, {"id": 337, "date": "2026-06-07", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 338, "date": "2026-06-07", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 17000, "transferTo": "", "income": 0}, {"id": 339, "date": "2026-06-07", "account": "GoPay", "category": "Accounts Receivable", "subcategory": "🧾Receivable", "note": "Dari Ibey", "expense": 0, "transferTo": "", "income": 15800}, {"id": 340, "date": "2026-06-07", "account": "GoPay", "category": "Accounts Receivable", "subcategory": "🧾Receivable", "note": "Dari Hilmi", "expense": 0, "transferTo": "", "income": 19000}, {"id": 341, "date": "2026-06-08", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 527}, {"id": 342, "date": "2026-06-08", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 105, "transferTo": "", "income": 0}, {"id": 343, "date": "2026-06-08", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Bubur Ayam", "expense": 12000, "transferTo": "", "income": 0}, {"id": 344, "date": "2026-06-08", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - DeChick", "expense": 28000, "transferTo": "", "income": 0}, {"id": 345, "date": "2026-06-08", "account": "Cash", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "Phani Ngutang", "expense": 10000, "transferTo": "", "income": 0}, {"id": 346, "date": "2026-06-09", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 525}, {"id": 347, "date": "2026-06-09", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 105, "transferTo": "", "income": 0}, {"id": 348, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Bubur Ayam", "expense": 12000, "transferTo": "", "income": 0}, {"id": 349, "date": "2026-06-09", "account": "GoPay", "category": "Adjustment", "subcategory": "✏️ Error Correction", "note": "Koreksi Kesalahan", "expense": 0, "transferTo": "", "income": 446}, {"id": 350, "date": "2026-06-09", "account": "SeaBank", "category": "Adjustment", "subcategory": "✏️ Error Correction", "note": "Koreksi Kesalahan", "expense": 0, "transferTo": "", "income": 999}, {"id": 351, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - DeChick", "expense": 28000, "transferTo": "", "income": 0}, {"id": 352, "date": "2026-06-09", "account": "GoPay", "category": "Accounts Receivable", "subcategory": "🧾Receivable", "note": "Dari Phani", "expense": 0, "transferTo": "", "income": 10001}, {"id": 353, "date": "2026-06-09", "account": "SeaBank", "category": "Beauty", "subcategory": "✂️ Haircut", "note": "Cukur Rambut - Barberlabs", "expense": 70000, "transferTo": "", "income": 0}, {"id": 354, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 13000, "transferTo": "", "income": 0}, {"id": 355, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 13000, "transferTo": "", "income": 0}, {"id": 356, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Rizky 800 ml", "expense": 18250, "transferTo": "", "income": 0}, {"id": 357, "date": "2026-06-09", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧼 Cleaning Supplies", "note": "Gentle Gen 700 ml", "expense": 14200, "transferTo": "", "income": 0}, {"id": 358, "date": "2026-06-09", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧼 Cleaning Supplies", "note": "Molto Pewangi Gentle 765 ml", "expense": 12750, "transferTo": "", "income": 0}, {"id": 359, "date": "2026-06-09", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🛁 Toiletries", "note": "Zen 800 ml", "expense": 31500, "transferTo": "", "income": 0}, {"id": 360, "date": "2026-06-09", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🛁 Toiletries", "note": "Sensodyne Whitening 100 ml", "expense": 31900, "transferTo": "", "income": 0}, {"id": 361, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍌Fruits", "note": "Pisang Sunpride", "expense": 16785, "transferTo": "", "income": 0}, {"id": 362, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Cassava", "expense": 9950, "transferTo": "", "income": 0}, {"id": 363, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Chitato", "expense": 11450, "transferTo": "", "income": 0}, {"id": 364, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Garam", "expense": 6400, "transferTo": "", "income": 0}, {"id": 365, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Sajiku Nasi Goreng Instan", "expense": 6300, "transferTo": "", "income": 0}, {"id": 366, "date": "2026-06-09", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Roti Kopi", "expense": 8000, "transferTo": "", "income": 0}, {"id": 367, "date": "2026-06-09", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧾 Household Contribution", "note": "Plastik Kresek x2", "expense": 600, "transferTo": "", "income": 0}, {"id": 368, "date": "2026-06-09", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7500, "transferTo": "", "income": 0}, {"id": 369, "date": "2026-06-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 503}, {"id": 370, "date": "2026-06-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 100000, "transferTo": "Dana", "income": 0}, {"id": 371, "date": "2026-06-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 400, "transferTo": "", "income": 0}, {"id": 372, "date": "2026-06-10", "account": "Dana", "category": "Daily Necessities", "subcategory": "🌐 Internet", "note": "Isi Pulsa", "expense": 20000, "transferTo": "", "income": 0}, {"id": 373, "date": "2026-06-10", "account": "Dana", "category": "Daily Necessities", "subcategory": "🌐 Internet", "note": "Isi Pulsa", "expense": 20000, "transferTo": "", "income": 0}, {"id": 374, "date": "2026-06-10", "account": "Dana", "category": "Daily Necessities", "subcategory": "🌐 Internet", "note": "Beli Kuota 65 GB", "expense": 15000, "transferTo": "", "income": 0}, {"id": 375, "date": "2026-06-10", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - DeChick", "expense": 28000, "transferTo": "", "income": 0}, {"id": 376, "date": "2026-06-11", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 495}, {"id": 377, "date": "2026-06-11", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Jajan", "expense": 9500, "transferTo": "", "income": 0}, {"id": 378, "date": "2026-06-11", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Telur 8 Butir", "expense": 14500, "transferTo": "", "income": 0}, {"id": 379, "date": "2026-06-11", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Goreng Spesial", "expense": 20000, "transferTo": "", "income": 0}, {"id": 380, "date": "2026-06-11", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Air Mineral", "expense": 5000, "transferTo": "", "income": 0}, {"id": 381, "date": "2026-06-11", "account": "Cash", "category": "Accounts Payable", "subcategory": "💰Debt", "note": "Ojan Ngutang", "expense": 20000, "transferTo": "", "income": 0}, {"id": 382, "date": "2026-06-11", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Ice Cold Brew", "expense": 9000, "transferTo": "", "income": 0}, {"id": 383, "date": "2026-06-12", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 492}, {"id": 384, "date": "2026-06-12", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Kolam Renang", "expense": 16000, "transferTo": "", "income": 0}, {"id": 385, "date": "2026-06-12", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Snack", "expense": 4000, "transferTo": "", "income": 0}, {"id": 386, "date": "2026-06-12", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Salt SaltBread", "expense": 17600, "transferTo": "", "income": 0}, {"id": 387, "date": "2026-06-12", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 388, "date": "2026-06-13", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 489}, {"id": 389, "date": "2026-06-13", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Magelangan - Libas", "expense": 14000, "transferTo": "", "income": 0}, {"id": 390, "date": "2026-06-13", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Kare - Janari", "expense": 15750, "transferTo": "", "income": 0}, {"id": 391, "date": "2026-06-14", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 487}, {"id": 392, "date": "2026-06-14", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Magelangan Dadar - Libas", "expense": 16000, "transferTo": "", "income": 0}, {"id": 393, "date": "2026-06-14", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 14000, "transferTo": "", "income": 0}, {"id": 394, "date": "2026-06-15", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 485}, {"id": 395, "date": "2026-06-15", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Donut", "expense": 6000, "transferTo": "", "income": 0}, {"id": 396, "date": "2026-06-15", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - DeChick", "expense": 28000, "transferTo": "", "income": 0}, {"id": 397, "date": "2026-06-16", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 482}, {"id": 398, "date": "2026-06-16", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 399, "date": "2026-06-16", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 17000, "transferTo": "", "income": 0}, {"id": 400, "date": "2026-06-17", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 481}, {"id": 401, "date": "2026-06-17", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 200000, "transferTo": "BNI", "income": 0}, {"id": 402, "date": "2026-06-17", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Tarik Tunai", "expense": 200000, "transferTo": "Cash", "income": 0}, {"id": 403, "date": "2026-06-17", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Crisbar", "expense": 29000, "transferTo": "", "income": 0}, {"id": 404, "date": "2026-06-17", "account": "Cash", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Daging Ayam 2 kg", "expense": 96000, "transferTo": "", "income": 0}, {"id": 405, "date": "2026-06-17", "account": "Cash", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Telur 1 kg", "expense": 26000, "transferTo": "", "income": 0}, {"id": 406, "date": "2026-06-17", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 10000, "transferTo": "", "income": 0}, {"id": 407, "date": "2026-06-18", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 464}, {"id": 408, "date": "2026-06-18", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🫖 Water Gallon", "note": "Galon Aqua", "expense": 26500, "transferTo": "", "income": 0}, {"id": 409, "date": "2026-06-19", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 463}, {"id": 410, "date": "2026-06-20", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 462}, {"id": 411, "date": "2026-06-21", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 463}, {"id": 412, "date": "2026-06-21", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Jajan", "expense": 32000, "transferTo": "", "income": 0}, {"id": 413, "date": "2026-06-22", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 460}, {"id": 414, "date": "2026-06-22", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Bubur", "expense": 12000, "transferTo": "", "income": 0}, {"id": 415, "date": "2026-06-22", "account": "SeaBank", "category": "Accounts Receivable", "subcategory": "🧾Receivable", "note": "Dari Ibey", "expense": 0, "transferTo": "", "income": 56000}, {"id": 416, "date": "2026-06-22", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🫙Food & Drink Container(s)", "note": "VOOVA Kotak Bekal Makan", "expense": 31440, "transferTo": "", "income": 0}, {"id": 417, "date": "2026-06-22", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🎲 Toys", "note": "Rubik 3x3 Windmill Fisher", "expense": 33960, "transferTo": "", "income": 0}, {"id": 418, "date": "2026-06-22", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - DeChick", "expense": 24000, "transferTo": "", "income": 0}, {"id": 419, "date": "2026-06-22", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Beras", "expense": 74500, "transferTo": "", "income": 0}, {"id": 420, "date": "2026-06-22", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 13500, "transferTo": "", "income": 0}, {"id": 421, "date": "2026-06-22", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 13500, "transferTo": "", "income": 0}, {"id": 422, "date": "2026-06-22", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Rizky 800 ml", "expense": 18200, "transferTo": "", "income": 0}, {"id": 423, "date": "2026-06-22", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧾 Household Contribution", "note": "Plastik Kresek", "expense": 500, "transferTo": "", "income": 0}, {"id": 424, "date": "2026-06-23", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 449}, {"id": 425, "date": "2026-06-23", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - DeChick", "expense": 19000, "transferTo": "", "income": 0}, {"id": 426, "date": "2026-06-24", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 448}, {"id": 427, "date": "2026-06-24", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam - DeChick", "expense": 19000, "transferTo": "", "income": 0}, {"id": 428, "date": "2026-06-24", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi + Ayam - Pecel Lele 88", "expense": 18000, "transferTo": "", "income": 0}, {"id": 429, "date": "2026-06-25", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 445}, {"id": 430, "date": "2026-06-25", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Mie + Cemilan", "expense": 23000, "transferTo": "", "income": 0}, {"id": 431, "date": "2026-06-25", "account": "Dana", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Le Minerale", "expense": 4000, "transferTo": "", "income": 0}, {"id": 432, "date": "2026-06-25", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Goreng Bakso", "expense": 20000, "transferTo": "", "income": 0}, {"id": 433, "date": "2026-06-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 442}, {"id": 434, "date": "2026-06-26", "account": "BNI", "category": "Allowance", "subcategory": "💵Allowance", "note": "Dari Papah", "expense": 0, "transferTo": "", "income": 2500000}, {"id": 435, "date": "2026-06-26", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🪙Electricity Token", "note": "Token Listirk", "expense": 102750, "transferTo": "", "income": 0}, {"id": 436, "date": "2026-06-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Nonton Colony", "expense": 35000, "transferTo": "", "income": 0}, {"id": 437, "date": "2026-06-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Jalan-jalan ke Pangalengan", "expense": 117500, "transferTo": "", "income": 0}, {"id": 438, "date": "2026-06-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Rafting", "expense": 150000, "transferTo": "", "income": 0}, {"id": 439, "date": "2026-06-26", "account": "SeaBank", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Tiket masuk Situ Cileunca", "expense": 15000, "transferTo": "", "income": 0}, {"id": 440, "date": "2026-06-26", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi", "expense": 6000, "transferTo": "", "income": 0}, {"id": 441, "date": "2026-06-27", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 413}, {"id": 442, "date": "2026-06-28", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 414}, {"id": 443, "date": "2026-06-28", "account": "GoPay", "category": "Daily Necessities", "subcategory": "🛁 Toiletries", "note": "Bayar Mandi", "expense": 6667, "transferTo": "", "income": 0}, {"id": 444, "date": "2026-06-29", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 413}, {"id": 445, "date": "2026-06-29", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 9000, "transferTo": "", "income": 0}, {"id": 446, "date": "2026-06-29", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - TO", "expense": 13000, "transferTo": "", "income": 0}, {"id": 447, "date": "2026-06-29", "account": "SeaBank", "category": "Present", "subcategory": "🎁 Gift", "note": "Hadiah perpisahan (Donut)", "expense": 101000, "transferTo": "", "income": 0}, {"id": 448, "date": "2026-06-29", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Telor", "expense": 17653, "transferTo": "", "income": 0}, {"id": 449, "date": "2026-06-29", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍌Fruits", "note": "Pisang Sunpride", "expense": 26887, "transferTo": "", "income": 0}, {"id": 450, "date": "2026-06-30", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 402}, {"id": 451, "date": "2026-06-30", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7500, "transferTo": "", "income": 0}, {"id": 452, "date": "2026-06-30", "account": "SeaBank", "category": "Transportation", "subcategory": "🚌Bus", "note": "Metro Jabar Trans", "expense": 4900, "transferTo": "", "income": 0}, {"id": 453, "date": "2026-06-30", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 14000, "transferTo": "", "income": 0}, {"id": 454, "date": "2026-06-30", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Goreng Ayam", "expense": 20000, "transferTo": "", "income": 0}, {"id": 455, "date": "2026-06-30", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 16000, "transferTo": "", "income": 0}, {"id": 456, "date": "2026-06-30", "account": "Taplus", "category": "Transportation", "subcategory": "🚌Bus", "note": "Metro Jabar Trans", "expense": 4900, "transferTo": "", "income": 0}, {"id": 457, "date": "2026-06-30", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 8000, "transferTo": "", "income": 0}, {"id": 458, "date": "2026-06-30", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 51}, {"id": 459, "date": "2026-06-30", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 5000, "transferTo": "", "income": 0}, {"id": 460, "date": "2026-07-01", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 397}, {"id": 461, "date": "2026-07-01", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 462, "date": "2026-07-01", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 5000, "transferTo": "BNI", "income": 0}, {"id": 463, "date": "2026-07-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 2497559, "transferTo": "SeaBank", "income": 0}, {"id": 464, "date": "2026-07-01", "account": "BNI", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 2500, "transferTo": "", "income": 0}, {"id": 465, "date": "2026-07-01", "account": "Taplus", "category": "Transportation", "subcategory": "🚌Bus", "note": "Metro Jabar Trans", "expense": 4900, "transferTo": "", "income": 0}, {"id": 466, "date": "2026-07-01", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 467, "date": "2026-07-01", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Spot", "expense": 18000, "transferTo": "", "income": 0}, {"id": 468, "date": "2026-07-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 566}, {"id": 469, "date": "2026-07-02", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak", "expense": 113, "transferTo": "", "income": 0}, {"id": 470, "date": "2026-07-02", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Padang - Ibra", "expense": 15000, "transferTo": "", "income": 0}, {"id": 471, "date": "2026-07-02", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 8900, "transferTo": "", "income": 0}, {"id": 472, "date": "2026-07-02", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 473, "date": "2026-07-02", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 474, "date": "2026-07-02", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Jajan", "expense": 69400, "transferTo": "", "income": 0}, {"id": 475, "date": "2026-07-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 559}, {"id": 476, "date": "2026-07-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak", "expense": 111, "transferTo": "", "income": 0}, {"id": 477, "date": "2026-07-03", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 478, "date": "2026-07-03", "account": "SeaBank", "category": "Transportation", "subcategory": "🚌Bus", "note": "Metro Jabar Trans", "expense": 4900, "transferTo": "", "income": 0}, {"id": 479, "date": "2026-07-03", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 13900, "transferTo": "", "income": 0}, {"id": 480, "date": "2026-07-03", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Roti", "expense": 22300, "transferTo": "", "income": 0}, {"id": 481, "date": "2026-07-03", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 16200, "transferTo": "", "income": 0}, {"id": 482, "date": "2026-07-03", "account": "Taplus", "category": "Transportation", "subcategory": "🚌Bus", "note": "Metro Jabar Trans", "expense": 4900, "transferTo": "", "income": 0}, {"id": 483, "date": "2026-07-03", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 484, "date": "2026-07-03", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 200000, "transferTo": "BNI", "income": 0}, {"id": 485, "date": "2026-07-03", "account": "BNI", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 200000, "transferTo": "BNI 2", "income": 0}, {"id": 486, "date": "2026-07-03", "account": "BNI 2", "category": "Lifestyle", "subcategory": "💸Game", "note": "Nameless Glory - HSR", "expense": 139493, "transferTo": "", "income": 0}, {"id": 487, "date": "2026-07-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 540}, {"id": 488, "date": "2026-07-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak", "expense": 108, "transferTo": "", "income": 0}, {"id": 489, "date": "2026-07-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 200000, "transferTo": "GoPay", "income": 0}, {"id": 490, "date": "2026-07-04", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Admin", "expense": 1000, "transferTo": "", "income": 0}, {"id": 491, "date": "2026-07-04", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Ayam", "expense": 74300, "transferTo": "", "income": 0}, {"id": 492, "date": "2026-07-04", "account": "Dana", "category": "Lifestyle", "subcategory": "🔁 Subscription", "note": "Canva", "expense": 316, "transferTo": "", "income": 0}, {"id": 493, "date": "2026-07-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 526}, {"id": 494, "date": "2026-07-05", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak", "expense": 105, "transferTo": "", "income": 0}, {"id": 495, "date": "2026-07-05", "account": "GoPay", "category": "Daily Necessities", "subcategory": "🌐 Internet", "note": "Beli Kuota 65 GB", "expense": 100000, "transferTo": "", "income": 0}, {"id": 496, "date": "2026-07-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 526}, {"id": 497, "date": "2026-07-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Pajak", "expense": 105, "transferTo": "", "income": 0}, {"id": 498, "date": "2026-07-06", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 499, "date": "2026-07-06", "account": "SeaBank", "category": "Transportation", "subcategory": "🚌Bus", "note": "Metro Jabar Trans", "expense": 4900, "transferTo": "", "income": 0}, {"id": 500, "date": "2026-07-06", "account": "GoPay", "category": "Lifestyle", "subcategory": "📈Trend", "note": "Starbucks", "expense": 7000, "transferTo": "", "income": 0}, {"id": 501, "date": "2026-07-06", "account": "Taplus", "category": "Transportation", "subcategory": "🚌Bus", "note": "Metro Jabar Trans", "expense": 4900, "transferTo": "", "income": 0}, {"id": 502, "date": "2026-07-06", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 503, "date": "2026-07-06", "account": "SeaBank", "category": "Daily Necessities", "subcategory": "🧾 Household Contribution", "note": "Plastik Kresek", "expense": 300, "transferTo": "", "income": 0}, {"id": 504, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Chitato", "expense": 11450, "transferTo": "", "income": 0}, {"id": 505, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Silverqueen", "expense": 20500, "transferTo": "", "income": 0}, {"id": 506, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Donut", "expense": 7500, "transferTo": "", "income": 0}, {"id": 507, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 13000, "transferTo": "", "income": 0}, {"id": 508, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Mie Goreng Sedap x5 90 gr", "expense": 13000, "transferTo": "", "income": 0}, {"id": 509, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍌Fruits", "note": "Pisang Sunpride", "expense": 21934, "transferTo": "", "income": 0}, {"id": 510, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "👨‍🍳Cooking ingredients", "note": "Saus Teriyaki", "expense": 19750, "transferTo": "", "income": 0}, {"id": 511, "date": "2026-07-06", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥯Snack", "note": "Salt Cheese", "expense": 9350, "transferTo": "", "income": 0}, {"id": 512, "date": "2026-07-06", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 513, "date": "2026-07-06", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Transfer Dana", "expense": 1539493, "transferTo": "BNI 2", "income": 0}, {"id": 514, "date": "2026-07-06", "account": "BNI 2", "category": "Lifestyle", "subcategory": "🔁 Transfer Between Accounts", "note": "Tarik Tunai", "expense": 1600000, "transferTo": "Cash", "income": 0}, {"id": 515, "date": "2026-07-06", "account": "Cash", "category": "Lifestyle", "subcategory": "💻 Laptop Maintenance", "note": "Ganti pasta + batre", "expense": 610000, "transferTo": "", "income": 0}, {"id": 516, "date": "2026-07-06", "account": "SeaBank", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 7000, "transferTo": "", "income": 0}, {"id": 517, "date": "2026-07-06", "account": "GoPay", "category": "Adjustment", "subcategory": "✏️ Error Correction", "note": "Koreksi Kesalahan", "expense": 0, "transferTo": "", "income": 184}, {"id": 518, "date": "2026-07-06", "account": "SeaBank", "category": "Adjustment", "subcategory": "✏️ Error Correction", "note": "Koreksi Kesalahan", "expense": 2999, "transferTo": "", "income": 0}, {"id": 519, "date": "2026-07-07", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 411}, {"id": 520, "date": "2026-07-07", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Penyesuaian", "expense": 0, "transferTo": "", "income": 5}, {"id": 521, "date": "2026-07-08", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 411}, {"id": 522, "date": "2026-07-08", "account": "GoPay", "category": "Transportation", "subcategory": "🏍️Motorcycle", "note": "Grab", "expense": 9100, "transferTo": "", "income": 0}, {"id": 523, "date": "2026-07-08", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam", "expense": 17000, "transferTo": "", "income": 0}, {"id": 524, "date": "2026-07-08", "account": "SeaBank", "category": "Food & Beverages", "subcategory": "🥛Drink", "note": "Nutrisari Jeruk Peras", "expense": 4000, "transferTo": "", "income": 0}, {"id": 525, "date": "2026-07-09", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 410}, {"id": 526, "date": "2026-07-09", "account": "GoPay", "category": "Food & Beverages", "subcategory": "🍽️Main Meal", "note": "Nasi Ayam - Sambel Hejo", "expense": 21000, "transferTo": "", "income": 0}, {"id": 527, "date": "2026-07-10", "account": "SeaBank", "category": "Lifestyle", "subcategory": "🧾 Fees & Charges", "note": "Bunga", "expense": 0, "transferTo": "", "income": 410}], "categories": [{"category": "Food & Beverages", "subcategories": ["🍽️Main Meal", "🥛Drink", "🥯Snack", "🍌Fruits", "🍅Vegetables", "👨‍🍳Cooking ingredients", "🛵 Dining Out"]}, {"category": "Transportation", "subcategories": ["🏍️Motorcycle", "🚕Car", "🚌Bus", "🚐 Angkot", "🚅Train", "🚐 Travel", "⛽ Gasoline", "🛣️ Toll", "🅿️ Parking", "💳E-Money Card"]}, {"category": "Lifestyle", "subcategories": ["📈Trend", "💸Game", "🎲 Toys", "🧾 Fees & Charges", "🔁 Transfer Between Accounts", "🔁 Subscription", "💻 Laptop Maintenance"]}, {"category": "Daily Necessities", "subcategories": ["🧾 Household Contribution", "🛁 Toiletries", "🧼 Cleaning Supplies", "🫖 Water Gallon", "🪙Electricity Token", "🫙Food & Drink Container(s)", "🌐 Internet"]}, {"category": "Clothes", "subcategories": ["👕Shirt", "👖Pants", "🧥Jacket", "🥼Functional Clothing"]}, {"category": "Accessory", "subcategories": ["🧢Hat", "⌚Watch", "🗝️Keychain"]}, {"category": "Beauty", "subcategories": ["🧴Skincare", "✂️ Haircut"]}, {"category": "Health", "subcategories": ["💆Massage", "🏥 Pharmacy", "🩺 Medical Service"]}, {"category": "Education", "subcategories": ["📚Book"]}, {"category": "Present", "subcategories": ["👨‍👩‍👦‍👦For Family", "🎁 Gift"]}, {"category": "Accounts Receivable", "subcategories": ["🧾Receivable"]}, {"category": "Accounts Payable", "subcategories": ["💰Debt"]}, {"category": "Allowance", "subcategories": ["💵Allowance"]}, {"category": "Salary", "subcategories": ["💎Salary"]}, {"category": "Bonus", "subcategories": ["👛Bonus", "🪙THR"]}, {"category": "Adjustment", "subcategories": ["✏️ Error Correction"]}], "accounts": [{"name": "BNI", "type": "bank", "opening": 2359114}, {"name": "BNI 2", "type": "bank", "opening": 4232269}, {"name": "GoPay", "type": "ewallet", "opening": 210320}, {"name": "SeaBank", "type": "bank", "opening": 25293}, {"name": "ShopeePay", "type": "ewallet", "opening": 16000}, {"name": "Cash", "type": "cash", "opening": 12000}, {"name": "Dana", "type": "ewallet", "opening": 4274}, {"name": "Steam Wallet", "type": "ewallet", "opening": 0}, {"name": "Taplus", "type": "bank", "opening": 0}], "budgets": {"Food & Beverages": 1500000, "Transportation": 500000, "Lifestyle": 400000, "Daily Necessities": 300000, "Clothes": 200000}};
const STORAGE_KEY = 'mm_money_manager_v1';

const CATEGORY_ICONS = {
  'Food & Beverages':'🍽️','Transportation':'🚗','Lifestyle':'🎯','Daily Necessities':'🧺',
  'Clothes':'👕','Accessory':'💍','Beauty':'💄','Health':'🩺','Education':'📚','Present':'🎁',
  'Accounts Receivable':'🧾','Accounts Payable':'💳','Allowance':'💵','Salary':'💎','Bonus':'🪙','Adjustment':'✏️'
};
const ACCOUNT_ICONS = { bank:'🏦', ewallet:'📱', cash:'💵' };
const CHART_PALETTE = ['#5C9A66','#3C7247','#8FAE6A','#C4A24B','#BD5B3C','#8B6BA8','#4B85A6','#B0784F','#6D8C63','#A6555F','#5E9C8C','#9C8A5C','#7A9E4C','#C97F9E','#5A7DA6','#A88B4C'];
const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
const DAYS_ID = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];

const ICONS = {
  plus:'<path d="M12 5v14M5 12h14"/>',
  download:'<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>',
  upload:'<path d="M12 21V9m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>',
  refresh:'<path d="M3 12a9 9 0 0115.36-6.36M21 12a9 9 0 01-15.36 6.36"/><path d="M3 4v5h5M21 20v-5h-5"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  trash:'<path d="M3 6h18"/><path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m2 0v14a1 1 0 01-1 1H7a1 1 0 01-1-1V6h12z"/>',
  close:'<path d="M18 6L6 18M6 6l12 12"/>',
  wallet:'<path d="M3 7a2 2 0 012-2h13a1 1 0 011 1v2M3 7v10a2 2 0 002 2h14a1 1 0 001-1V9a1 1 0 00-1-1H5a2 2 0 01-2-2z"/><circle cx="16" cy="14" r="1.4"/>'
};
function icon(name, cls){ return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls||''}">${ICONS[name]}</svg>`; }

/* ============ STATE ============ */
let state = loadState();
let editingTxnId = null;
let editingAcctName = null;
let txnType = 'expense';
let currentTab = 'dashboard';
let filters = { account:'', category:'', q:'', from:'', to:'' };
let txnPage = 0;
const PAGE_SIZE = 40;

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      if(parsed && Array.isArray(parsed.transactions)) return parsed;
    }
  }catch(e){ console.warn('gagal memuat data tersimpan', e); }
  return JSON.parse(JSON.stringify(SEED));
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

/* ============ HELPERS ============ */
function fmtRupiah(n){
  n = Math.round(n||0);
  const neg = n < 0;
  return (neg?'-':'') + 'Rp' + Math.abs(n).toLocaleString('id-ID');
}
function fmtDateShort(d){
  const [y,m,day] = d.split('-').map(Number);
  return `${day} ${MONTHS_ID[m-1]} ${y}`;
}
function fmtMonthLabel(key){
  const [y,m] = key.split('-').map(Number);
  return `${MONTHS_ID[m-1]} ${y}`;
}
function dayName(d){ return DAYS_ID[new Date(d+'T00:00:00').getDay()]; }
function todayStr(){ const d = new Date(); return d.toISOString().slice(0,10); }
function uid(){ return Date.now()*1000 + Math.floor(Math.random()*1000); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function catIcon(cat){ return CATEGORY_ICONS[cat] || '💠'; }
function subLabel(sub){ return sub || '—'; }

/* ============ LEDGER ENGINE ============ */
function computeLedger(){
  const accBal = {};
  state.accounts.forEach(a=> accBal[a.name] = Number(a.opening)||0);
  let total = state.accounts.reduce((s,a)=> s + (Number(a.opening)||0), 0);
  const sorted = [...state.transactions].sort((a,b)=> a.date===b.date ? a.id-b.id : a.date.localeCompare(b.date));
  const enriched = [];
  for(const t of sorted){
    if(!(t.account in accBal)) accBal[t.account] = 0;
    const expense = Number(t.expense)||0, income = Number(t.income)||0;
    if(t.transferTo){
      accBal[t.account] -= expense;
      if(!(t.transferTo in accBal)) accBal[t.transferTo] = 0;
      accBal[t.transferTo] += expense;
    } else {
      total += income - expense;
      accBal[t.account] += income - expense;
    }
    enriched.push(Object.assign({}, t, { runningBalance: total, runningAccountBalance: accBal[t.account] }));
  }
  return { enriched, accBal, total };
}

function monthlyAggregate(enriched){
  if(enriched.length===0) return [];
  const openingTotal = state.accounts.reduce((s,a)=> s + (Number(a.opening)||0), 0);
  const first = enriched[0].date.slice(0,7);
  const now = todayStr().slice(0,7);
  const last = enriched[enriched.length-1].date.slice(0,7) > now ? enriched[enriched.length-1].date.slice(0,7) : now;
  const keys = [];
  let [y,m] = first.split('-').map(Number);
  const [ly,lm] = last.split('-').map(Number);
  while(y < ly || (y===ly && m<=lm)){
    keys.push(`${y}-${String(m).padStart(2,'0')}`);
    m++; if(m>12){m=1;y++;}
  }
  const byMonth = {};
  keys.forEach(k=> byMonth[k] = { key:k, income:0, expense:0, endBalance:null });
  enriched.forEach(t=>{
    const k = t.date.slice(0,7);
    if(!byMonth[k]) byMonth[k] = { key:k, income:0, expense:0, endBalance:null };
    if(!t.transferTo){
      byMonth[k].income += Number(t.income)||0;
      byMonth[k].expense += Number(t.expense)||0;
    }
    byMonth[k].endBalance = t.runningBalance;
  });
  let runningEnd = openingTotal;
  const out = keys.map(k=>{
    const row = byMonth[k];
    const start = runningEnd;
    const end = row.endBalance!=null ? row.endBalance : start;
    runningEnd = end;
    return { key:k, label:fmtMonthLabel(k), start, income:row.income, expense:row.expense, net:row.income-row.expense, end };
  });
  return out;
}

/* ============ CHARTS ============ */
function renderDonut(data, size){
  size = size || 150;
  const total = data.reduce((s,d)=>s+d.value,0);
  const r = size*0.36, cx = size/2, cy = size/2, sw = size*0.155;
  const c = 2*Math.PI*r;
  if(total<=0){
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${sw}"/></svg>`;
  }
  let offset = 0, circles = '';
  data.forEach(d=>{
    const frac = d.value/total;
    const len = Math.max(frac*c - 1.5, 0);
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${sw}" stroke-dasharray="${len} ${c-len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})" stroke-linecap="round"/>`;
    offset += frac*c;
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${circles}</svg>`;
}

function renderMonthlyBars(months){
  const max = Math.max(1, ...months.map(m=>Math.max(m.income,m.expense)));
  return `<div class="bar-chart">` + months.map(m=>{
    const hIncome = Math.max(2, Math.round(m.income/max*118));
    const hExpense = Math.max(2, Math.round(m.expense/max*118));
    return `<div class="col">
      <div class="bars">
        <div class="bar" style="height:${hIncome}px;background:var(--income)" title="${esc(m.label)} · Pemasukan ${fmtRupiah(m.income)}"></div>
        <div class="bar" style="height:${hExpense}px;background:var(--expense)" title="${esc(m.label)} · Pengeluaran ${fmtRupiah(m.expense)}"></div>
      </div>
      <div class="col-label">${esc(m.label.split(' ')[0])}</div>
    </div>`;
  }).join('') + `</div>`;
}

/* ============ TOAST ============ */
let toastTimer;
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove('show'), 2600);
}

/* ============ NAV ============ */
const TABS = [
  { id:'dashboard', label:'Dasbor' },
  { id:'transactions', label:'Transaksi' },
  { id:'balance', label:'Saldo Bulanan' },
  { id:'categories', label:'Kategori & Anggaran' },
  { id:'accounts', label:'Akun' },
];
function renderNav(){
  const nav = document.getElementById('tabNav');
  nav.innerHTML = TABS.map(t=> `<button class="tab-btn ${t.id===currentTab?'active':''}" data-tab="${t.id}"><span class="tab-dot"></span>${t.label}</button>`).join('');
  nav.querySelectorAll('.tab-btn').forEach(b=> b.addEventListener('click', ()=> switchTab(b.dataset.tab)));
}
function switchTab(tab){
  currentTab = tab;
  document.querySelectorAll('.view').forEach(v=> v.classList.toggle('active', v.id === 'view-'+tab));
  renderNav();
  renderCurrentTab();
  window.scrollTo({top:0, behavior:'smooth'});
}
function renderCurrentTab(){
  if(currentTab==='dashboard') renderDashboard();
  else if(currentTab==='transactions') renderTransactions();
  else if(currentTab==='balance') renderBalance();
  else if(currentTab==='categories') renderCategories();
  else if(currentTab==='accounts') renderAccounts();
}

/* ============ DASHBOARD ============ */
function renderDashboard(){
  const { enriched, accBal, total } = computeLedger();
  const nowKey = todayStr().slice(0,7);
  const monthTx = enriched.filter(t=> t.date.slice(0,7)===nowKey);
  const income = monthTx.filter(t=>!t.transferTo).reduce((s,t)=>s+(t.income||0),0);
  const expense = monthTx.filter(t=>!t.transferTo).reduce((s,t)=>s+(t.expense||0),0);
  const net = income-expense;

  const el = document.getElementById('view-dashboard');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Dasbor</h2><p class="sub">Ringkasan keuangan · ${fmtMonthLabel(nowKey)}</p></div>
      <div class="section-head-actions">
        <button class="btn btn-primary" id="btnAddTxnDash">${icon('plus')}Tambah Transaksi</button>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card hero"><span class="swatch"></span>
        <div class="label">Total Saldo</div>
        <div class="value">${fmtRupiah(total)}</div>
        <div class="delta">di ${state.accounts.length} akun</div>
      </div>
      <div class="stat-card"><span class="swatch"></span>
        <div class="label">Pemasukan Bulan Ini</div>
        <div class="value pos">${fmtRupiah(income)}</div>
        <div class="delta">${monthTx.filter(t=>!t.transferTo&&t.income>0).length} transaksi</div>
      </div>
      <div class="stat-card"><span class="swatch"></span>
        <div class="label">Pengeluaran Bulan Ini</div>
        <div class="value neg">${fmtRupiah(expense)}</div>
        <div class="delta">${monthTx.filter(t=>!t.transferTo&&t.expense>0).length} transaksi</div>
      </div>
      <div class="stat-card"><span class="swatch"></span>
        <div class="label">Arus Kas Bersih</div>
        <div class="value ${net>=0?'pos':'neg'}">${fmtRupiah(net)}</div>
        <div class="delta">bulan berjalan</div>
      </div>
    </div>

    <div class="dash-grid">
      <div class="card card-pad">
        <p class="panel-title">Tren Bulanan</p>
        <p class="panel-sub">Pemasukan vs pengeluaran, 6 bulan terakhir</p>
        ${renderMonthlyBars(monthlyAggregate(enriched).slice(-6))}
        <div class="chart-legend">
          <div class="legend-item"><span class="legend-swatch" style="background:var(--income)"></span>Pemasukan</div>
          <div class="legend-item"><span class="legend-swatch" style="background:var(--expense)"></span>Pengeluaran</div>
        </div>
      </div>
      <div class="card card-pad">
        <p class="panel-title">Pengeluaran per Kategori</p>
        <p class="panel-sub">Bulan ${fmtMonthLabel(nowKey)}</p>
        ${renderCategoryDonutBlock(monthTx)}
      </div>
    </div>

    <div class="dash-grid">
      <div class="card card-pad">
        <p class="panel-title">Saldo per Akun</p>
        <p class="panel-sub">Klik "Akun" pada menu untuk kelola lebih lanjut</p>
        <div class="acct-grid" style="grid-template-columns:repeat(2,1fr)">
          ${state.accounts.slice(0,6).map(a=>`
            <div class="acct-card" style="padding:12px 14px;">
              <div class="acct-top">
                <div class="acct-icon">${ACCOUNT_ICONS[a.type]||'💳'}</div>
                <span class="acct-type-tag">${a.type}</span>
              </div>
              <div class="acct-name">${esc(a.name)}</div>
              <div class="acct-balance" style="font-size:15px;">${fmtRupiah(accBal[a.name]||0)}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="card card-pad">
        <p class="panel-title">Transaksi Terbaru</p>
        <p class="panel-sub">10 transaksi paling akhir</p>
        <div>
          ${enriched.slice(-10).reverse().map(t=> recentItemHtml(t)).join('') || emptyHtml('Belum ada transaksi')}
        </div>
      </div>
    </div>
  `;
  document.getElementById('btnAddTxnDash').addEventListener('click', ()=> openTxnModal());
}

function recentItemHtml(t){
  const isIncome = !t.transferTo && t.income>0;
  const isTransfer = !!t.transferTo;
  const amt = isTransfer ? t.expense : (isIncome ? t.income : t.expense);
  const sign = isTransfer ? '' : (isIncome ? '+' : '-');
  const color = isTransfer ? '' : (isIncome ? 'pos' : 'neg');
  return `<div class="recent-item">
    <div class="recent-icon">${(t.subcategory||'').trim().slice(0,2) || catIcon(t.category)}</div>
    <div class="recent-mid">
      <div class="t1">${esc(t.note || t.subcategory || t.category)}</div>
      <div class="t2">${fmtDateShort(t.date)} · ${esc(t.account)}${isTransfer? ' → '+esc(t.transferTo):''}</div>
    </div>
    <div class="recent-amt ${color}">${sign}${fmtRupiah(amt)}</div>
  </div>`;
}
function emptyHtml(msg){
  return `<div class="empty">${icon('wallet')}<div>${esc(msg)}</div></div>`;
}

function renderCategoryDonutBlock(monthTx){
  const byCat = {};
  monthTx.filter(t=>!t.transferTo && t.expense>0).forEach(t=>{
    byCat[t.category] = (byCat[t.category]||0) + t.expense;
  });
  const entries = Object.entries(byCat).sort((a,b)=>b[1]-a[1]);
  if(entries.length===0) return emptyHtml('Belum ada pengeluaran bulan ini');
  const top = entries.slice(0,7);
  const data = top.map(([cat,val],i)=> ({label:cat, value:val, color:CHART_PALETTE[i%CHART_PALETTE.length]}));
  const total = entries.reduce((s,[,v])=>s+v,0);
  return `<div style="display:flex; gap:20px; align-items:center; flex-wrap:wrap;">
    ${renderDonut(data,140)}
    <div style="flex:1; min-width:160px;">
      ${data.map(d=>`<div class="legend-item" style="justify-content:space-between; margin-bottom:6px;">
        <span style="display:flex;align-items:center;gap:7px;"><span class="legend-swatch" style="background:${d.color}"></span>${catIcon(d.label)} ${esc(d.label)}</span>
        <span style="font-family:var(--font-mono);font-weight:600;color:var(--ink)">${Math.round(d.value/total*100)}%</span>
      </div>`).join('')}
    </div>
  </div>`;
}

/* ============ TRANSACTIONS ============ */
function renderTransactions(){
  const { enriched } = computeLedger();
  let list = [...enriched].reverse();

  if(filters.account) list = list.filter(t=>t.account===filters.account);
  if(filters.category) list = list.filter(t=>t.category===filters.category);
  if(filters.from) list = list.filter(t=>t.date>=filters.from);
  if(filters.to) list = list.filter(t=>t.date<=filters.to);
  if(filters.q){
    const q = filters.q.toLowerCase();
    list = list.filter(t=> (t.note||'').toLowerCase().includes(q) || (t.subcategory||'').toLowerCase().includes(q));
  }

  const totalPages = Math.max(1, Math.ceil(list.length/PAGE_SIZE));
  txnPage = Math.min(txnPage, totalPages-1);
  const pageList = list.slice(txnPage*PAGE_SIZE, txnPage*PAGE_SIZE+PAGE_SIZE);

  const el = document.getElementById('view-transactions');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Transaksi</h2><p class="sub">${list.length} transaksi ditemukan</p></div>
      <div class="section-head-actions">
        <button class="btn btn-primary" id="btnAddTxn">${icon('plus')}Tambah Transaksi</button>
      </div>
    </div>
    <div class="filters">
      <div class="field"><label>Akun</label>
        <select class="input" id="fAccount"><option value="">Semua</option>${state.accounts.map(a=>`<option value="${esc(a.name)}" ${filters.account===a.name?'selected':''}>${esc(a.name)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Kategori</label>
        <select class="input" id="fCategory"><option value="">Semua</option>${state.categories.map(c=>`<option value="${esc(c.category)}" ${filters.category===c.category?'selected':''}>${esc(c.category)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Dari</label><input type="date" class="input" id="fFrom" value="${filters.from}"></div>
      <div class="field"><label>Sampai</label><input type="date" class="input" id="fTo" value="${filters.to}"></div>
      <div class="field search-field"><label>Cari catatan</label><input type="text" class="input" id="fSearch" placeholder="cth. Nasi Ayam" value="${esc(filters.q)}"></div>
      <div class="field"><label>&nbsp;</label><button class="btn btn-ghost btn-sm" id="fClear">Reset filter</button></div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Tanggal</th><th>Hari</th><th>Akun</th><th>Kategori</th><th>Catatan</th>
          <th style="text-align:right">Pemasukan</th><th style="text-align:right">Pengeluaran</th>
          <th>Transfer ke</th><th style="text-align:right">Saldo</th><th style="text-align:right">Saldo Akun</th><th></th>
        </tr></thead>
        <tbody>
          ${pageList.map(t=>txnRowHtml(t)).join('') || `<tr><td colspan="11"><div class="empty">${icon('wallet')}<div>Tidak ada transaksi yang cocok</div></div></td></tr>`}
        </tbody>
      </table>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
      <span style="font-size:12.5px; color:var(--ink-muted)">Halaman ${txnPage+1} dari ${totalPages}</span>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-sm" id="pgPrev" ${txnPage===0?'disabled':''}>← Sebelumnya</button>
        <button class="btn btn-sm" id="pgNext" ${txnPage>=totalPages-1?'disabled':''}>Berikutnya →</button>
      </div>
    </div>
  `;

  document.getElementById('btnAddTxn').addEventListener('click', ()=> openTxnModal());
  document.getElementById('fAccount').addEventListener('change', e=>{ filters.account=e.target.value; txnPage=0; renderTransactions(); });
  document.getElementById('fCategory').addEventListener('change', e=>{ filters.category=e.target.value; txnPage=0; renderTransactions(); });
  document.getElementById('fFrom').addEventListener('change', e=>{ filters.from=e.target.value; txnPage=0; renderTransactions(); });
  document.getElementById('fTo').addEventListener('change', e=>{ filters.to=e.target.value; txnPage=0; renderTransactions(); });
  document.getElementById('fSearch').addEventListener('input', e=>{ filters.q=e.target.value; txnPage=0; renderTransactions(); });
  document.getElementById('fClear').addEventListener('click', ()=>{ filters={account:'',category:'',q:'',from:'',to:''}; txnPage=0; renderTransactions(); });
  document.getElementById('pgPrev').addEventListener('click', ()=>{ txnPage=Math.max(0,txnPage-1); renderTransactions(); });
  document.getElementById('pgNext').addEventListener('click', ()=>{ txnPage=txnPage+1; renderTransactions(); });
  el.querySelectorAll('[data-edit]').forEach(b=> b.addEventListener('click', ()=> openTxnModal(Number(b.dataset.edit))));
  el.querySelectorAll('[data-del]').forEach(b=> b.addEventListener('click', ()=> deleteTxn(Number(b.dataset.del))));
}

function txnRowHtml(t){
  const isTransfer = !!t.transferTo;
  return `<tr>
    <td>${fmtDateShort(t.date)}</td>
    <td>${dayName(t.date)}</td>
    <td>${esc(t.account)}</td>
    <td><div class="cell-cat"><span class="cat-chip">${catIcon(t.category)} ${esc(t.category)}</span></div></td>
    <td class="note-cell" title="${esc(t.note)} ${esc(t.subcategory)}">${esc(t.note) || esc(t.subcategory) || '—'}</td>
    <td class="num pos">${t.income? fmtRupiah(t.income):'—'}</td>
    <td class="num neg">${t.expense? fmtRupiah(t.expense):'—'}</td>
    <td>${isTransfer? esc(t.transferTo) : '—'}</td>
    <td class="num">${fmtRupiah(t.runningBalance)}</td>
    <td class="num">${fmtRupiah(t.runningAccountBalance)}</td>
    <td><div class="row-actions">
      <button data-edit="${t.id}" title="Edit">${icon('edit')}</button>
      <button data-del="${t.id}" class="del" title="Hapus">${icon('trash')}</button>
    </div></td>
  </tr>`;
}

function deleteTxn(id){
  if(!confirm('Hapus transaksi ini? Tindakan ini tidak bisa dibatalkan.')) return;
  state.transactions = state.transactions.filter(t=>t.id!==id);
  saveState();
  renderTransactions();
  toast('Transaksi dihapus');
}

/* ============ TRANSACTION MODAL ============ */
function openTxnModal(id){
  editingTxnId = id || null;
  const t = id ? state.transactions.find(x=>x.id===id) : null;
  txnType = t ? (t.transferTo ? 'transfer' : (t.income>0 ? 'income' : 'expense')) : 'expense';

  document.getElementById('txnModalTitle').textContent = id ? 'Ubah Transaksi' : 'Tambah Transaksi';
  document.getElementById('txnDate').value = t ? t.date : todayStr();
  document.getElementById('txnAccount').innerHTML = state.accounts.map(a=>`<option value="${esc(a.name)}">${esc(a.name)}</option>`).join('');
  document.getElementById('txnAccount').value = t ? t.account : state.accounts[0].name;
  document.getElementById('txnNote').value = t ? (t.note||'') : '';
  document.getElementById('txnAmount').value = t ? (t.transferTo? t.expense : (t.income||t.expense||'')) : '';

  populateCategorySelect(t ? t.category : state.categories[0].category);
  document.getElementById('txnCategory').value = t ? t.category : state.categories[0].category;
  populateSubcategorySelect(document.getElementById('txnCategory').value, t? t.subcategory : '');

  document.getElementById('txnTransferTo').innerHTML = state.accounts.map(a=>`<option value="${esc(a.name)}">${esc(a.name)}</option>`).join('');
  if(t && t.transferTo) document.getElementById('txnTransferTo').value = t.transferTo;

  setTxnType(txnType);
  document.getElementById('txnModalOverlay').classList.add('open');
  document.getElementById('txnDate').focus();
}
function closeTxnModal(){ document.getElementById('txnModalOverlay').classList.remove('open'); }

function populateCategorySelect(selected){
  const sel = document.getElementById('txnCategory');
  sel.innerHTML = state.categories.map(c=>`<option value="${esc(c.category)}">${catIcon(c.category)} ${esc(c.category)}</option>`).join('');
  if(selected) sel.value = selected;
}
function populateSubcategorySelect(cat, selected){
  const catObj = state.categories.find(c=>c.category===cat);
  const sel = document.getElementById('txnSubcategory');
  const subs = catObj ? catObj.subcategories : [];
  sel.innerHTML = `<option value="">—</option>` + subs.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('');
  if(selected) sel.value = selected;
}

function setTxnType(type){
  txnType = type;
  document.querySelectorAll('.type-toggle button').forEach(b=> b.classList.toggle('active', b.dataset.type===type));
  document.getElementById('rowCategory').style.display = type==='transfer' ? 'none' : 'flex';
  document.getElementById('rowTransfer').style.display = type==='transfer' ? 'flex' : 'none';
  document.getElementById('amountLabel').textContent = type==='income' ? 'Jumlah Pemasukan' : (type==='transfer' ? 'Jumlah Transfer' : 'Jumlah Pengeluaran');
}

function saveTxnForm(){
  const date = document.getElementById('txnDate').value;
  const account = document.getElementById('txnAccount').value;
  const note = document.getElementById('txnNote').value.trim();
  const amount = Number(document.getElementById('txnAmount').value) || 0;
  if(!date){ toast('Tanggal wajib diisi'); return; }
  if(amount<=0){ toast('Jumlah harus lebih dari 0'); return; }

  let payload = { date, account, note, category:'', subcategory:'', expense:0, income:0, transferTo:'' };
  if(txnType==='transfer'){
    const to = document.getElementById('txnTransferTo').value;
    if(to===account){ toast('Akun tujuan harus berbeda dari akun asal'); return; }
    payload.category = 'Lifestyle';
    payload.subcategory = '🔁 Transfer Between Accounts';
    payload.expense = amount;
    payload.transferTo = to;
  } else if(txnType==='income'){
    payload.category = document.getElementById('txnCategory').value;
    payload.subcategory = document.getElementById('txnSubcategory').value;
    payload.income = amount;
  } else {
    payload.category = document.getElementById('txnCategory').value;
    payload.subcategory = document.getElementById('txnSubcategory').value;
    payload.expense = amount;
  }

  if(editingTxnId){
    const idx = state.transactions.findIndex(t=>t.id===editingTxnId);
    state.transactions[idx] = Object.assign({id:editingTxnId}, payload);
    toast('Transaksi diperbarui');
  } else {
    state.transactions.push(Object.assign({id:uid()}, payload));
    toast('Transaksi ditambahkan');
  }
  saveState();
  closeTxnModal();
  renderCurrentTab();
}

/* ============ BALANCE (MONTHLY) ============ */
function renderBalance(){
  const { enriched } = computeLedger();
  const months = monthlyAggregate(enriched);
  const el = document.getElementById('view-balance');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Saldo Bulanan</h2><p class="sub">Ringkasan arus kas per bulan, dihitung otomatis dari seluruh transaksi</p></div>
    </div>
    <div class="card card-pad" style="margin-bottom:18px;">
      <p class="panel-title">Tren Saldo Akhir Bulan</p>
      ${renderMonthlyBars(months)}
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-swatch" style="background:var(--income)"></span>Pemasukan</div>
        <div class="legend-item"><span class="legend-swatch" style="background:var(--expense)"></span>Pengeluaran</div>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Bulan</th><th style="text-align:right">Saldo Awal</th><th style="text-align:right">Pemasukan</th>
          <th style="text-align:right">Pengeluaran</th><th style="text-align:right">Arus Kas Bersih</th><th style="text-align:right">Saldo Akhir</th>
        </tr></thead>
        <tbody>
          ${months.slice().reverse().map(m=>`<tr>
            <td style="font-weight:600">${esc(m.label)}</td>
            <td class="num">${fmtRupiah(m.start)}</td>
            <td class="num pos">${fmtRupiah(m.income)}</td>
            <td class="num neg">${fmtRupiah(m.expense)}</td>
            <td class="num ${m.net>=0?'pos':'neg'}">${fmtRupiah(m.net)}</td>
            <td class="num" style="font-weight:600">${fmtRupiah(m.end)}</td>
          </tr>`).join('') || `<tr><td colspan="6"><div class="empty">Belum ada data</div></td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

/* ============ CATEGORIES & BUDGETS ============ */
function renderCategories(){
  const { enriched } = computeLedger();
  const nowKey = todayStr().slice(0,7);
  const spendByCat = {};
  enriched.filter(t=>t.date.slice(0,7)===nowKey && !t.transferTo).forEach(t=>{
    spendByCat[t.category] = (spendByCat[t.category]||0) + (t.expense||0);
  });
  const budgetCats = Object.keys(state.budgets||{});

  const el = document.getElementById('view-categories');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Kategori & Anggaran</h2><p class="sub">Kelola kategori dan pantau anggaran bulanan · ${fmtMonthLabel(nowKey)}</p></div>
      <div class="section-head-actions">
        <button class="btn" id="btnAddCat">${icon('plus')}Kategori Baru</button>
      </div>
    </div>

    <div class="card card-pad" style="margin-bottom:20px;">
      <p class="panel-title">Anggaran Bulanan</p>
      <p class="panel-sub">Atur batas pengeluaran per kategori — isi 0 untuk menonaktifkan</p>
      <div class="budget-list">
        ${state.categories.map(c=>{
          const budget = (state.budgets && state.budgets[c.category]) || 0;
          const spend = spendByCat[c.category] || 0;
          const pct = budget>0 ? Math.min(100, Math.round(spend/budget*100)) : 0;
          const over = budget>0 && spend>budget;
          if(budget<=0 && spend<=0) return '';
          return `<div class="budget-row">
            <div class="budget-top">
              <span class="cat-label">${catIcon(c.category)} ${esc(c.category)}</span>
              <span class="amounts">${fmtRupiah(spend)} <input type="number" class="input" data-budget="${esc(c.category)}" value="${budget}" style="width:110px; display:inline-block; padding:4px 8px; margin-left:6px;"></span>
            </div>
            <div class="bar-track"><div class="bar-fill ${over?'over':''}" style="width:${budget>0?pct:0}%"></div></div>
          </div>`;
        }).join('') || emptyHtml('Belum ada anggaran diatur')}
      </div>
    </div>

    <div id="catList">
      ${state.categories.map(c=>`
        <div class="cat-section">
          <h4>${catIcon(c.category)} ${esc(c.category)} <button class="btn btn-ghost btn-sm" data-addsub="${esc(c.category)}">${icon('plus')}Sub</button></h4>
          <div class="sub-grid">
            ${c.subcategories.map(s=>`<span class="sub-chip">${esc(s)}</span>`).join('') || '<span class="sub-chip" style="opacity:.6">Belum ada subkategori</span>'}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  el.querySelectorAll('[data-budget]').forEach(inp=>{
    inp.addEventListener('change', ()=>{
      state.budgets = state.budgets || {};
      state.budgets[inp.dataset.budget] = Number(inp.value)||0;
      saveState();
      renderCategories();
      toast('Anggaran disimpan');
    });
  });
  el.querySelectorAll('[data-addsub]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const cat = b.dataset.addsub;
      const name = prompt(`Nama subkategori baru untuk "${cat}" (boleh sertakan emoji):`);
      if(!name) return;
      const catObj = state.categories.find(c=>c.category===cat);
      catObj.subcategories.push(name.trim());
      saveState();
      renderCategories();
      toast('Subkategori ditambahkan');
    });
  });
  document.getElementById('btnAddCat').addEventListener('click', ()=>{
    const name = prompt('Nama kategori baru:');
    if(!name) return;
    if(state.categories.some(c=>c.category.toLowerCase()===name.trim().toLowerCase())){ toast('Kategori sudah ada'); return; }
    state.categories.push({ category:name.trim(), subcategories:[] });
    saveState();
    renderCategories();
    toast('Kategori ditambahkan');
  });
}

/* ============ ACCOUNTS ============ */
function renderAccounts(){
  const { accBal } = computeLedger();
  const el = document.getElementById('view-accounts');
  el.innerHTML = `
    <div class="section-head">
      <div><h2>Akun</h2><p class="sub">Saldo dihitung otomatis dari saldo awal + seluruh transaksi</p></div>
      <div class="section-head-actions">
        <button class="btn btn-primary" id="btnAddAcct">${icon('plus')}Tambah Akun</button>
      </div>
    </div>
    <div class="acct-grid">
      ${state.accounts.map(a=>`
        <div class="acct-card" data-acct="${esc(a.name)}">
          <div class="acct-top">
            <div class="acct-icon">${ACCOUNT_ICONS[a.type]||'💳'}</div>
            <span class="acct-type-tag">${a.type}</span>
          </div>
          <div class="acct-name">${esc(a.name)}</div>
          <div class="acct-balance">${fmtRupiah(accBal[a.name]||0)}</div>
          <div class="row-actions" style="justify-content:flex-end;">
            <button data-editacct="${esc(a.name)}" title="Edit">${icon('edit')}</button>
            <button data-delacct="${esc(a.name)}" class="del" title="Hapus">${icon('trash')}</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('btnAddAcct').addEventListener('click', ()=> openAcctModal());
  el.querySelectorAll('[data-editacct]').forEach(b=> b.addEventListener('click', ()=> openAcctModal(b.dataset.editacct)));
  el.querySelectorAll('[data-delacct]').forEach(b=> b.addEventListener('click', ()=> deleteAcct(b.dataset.delacct)));
}

function deleteAcct(name){
  const used = state.transactions.some(t=>t.account===name || t.transferTo===name);
  if(used){ toast('Akun tidak bisa dihapus karena masih dipakai di transaksi'); return; }
  if(!confirm(`Hapus akun "${name}"?`)) return;
  state.accounts = state.accounts.filter(a=>a.name!==name);
  saveState();
  renderAccounts();
  toast('Akun dihapus');
}

function openAcctModal(name){
  editingAcctName = name || null;
  const a = name ? state.accounts.find(x=>x.name===name) : null;
  document.getElementById('acctModalTitle').textContent = name ? 'Ubah Akun' : 'Tambah Akun';
  document.getElementById('acctName').value = a ? a.name : '';
  document.getElementById('acctType').value = a ? a.type : 'bank';
  document.getElementById('acctOpening').value = a ? a.opening : 0;
  document.getElementById('acctModalOverlay').classList.add('open');
  document.getElementById('acctName').focus();
}
function closeAcctModal(){ document.getElementById('acctModalOverlay').classList.remove('open'); }
function saveAcctForm(){
  const name = document.getElementById('acctName').value.trim();
  const type = document.getElementById('acctType').value;
  const opening = Number(document.getElementById('acctOpening').value)||0;
  if(!name){ toast('Nama akun wajib diisi'); return; }
  if(editingAcctName){
    const idx = state.accounts.findIndex(a=>a.name===editingAcctName);
    if(editingAcctName!==name){
      state.transactions.forEach(t=>{
        if(t.account===editingAcctName) t.account=name;
        if(t.transferTo===editingAcctName) t.transferTo=name;
      });
    }
    state.accounts[idx] = { name, type, opening };
    toast('Akun diperbarui');
  } else {
    if(state.accounts.some(a=>a.name===name)){ toast('Nama akun sudah dipakai'); return; }
    state.accounts.push({ name, type, opening });
    toast('Akun ditambahkan');
  }
  saveState();
  closeAcctModal();
  renderCurrentTab();
}

/* ============ IMPORT / EXPORT / RESET ============ */
function exportData(){
  const blob = new Blob([JSON.stringify(state, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `money-manager-${todayStr()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast('Data diekspor');
}
function importData(file){
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      const parsed = JSON.parse(reader.result);
      if(!Array.isArray(parsed.transactions) || !Array.isArray(parsed.accounts)) throw new Error('format tidak sesuai');
      state = parsed;
      saveState();
      renderCurrentTab();
      toast('Data berhasil diimpor');
    }catch(e){
      toast('Gagal mengimpor: file tidak valid');
    }
  };
  reader.readAsText(file);
}
function resetData(){
  if(!confirm('Reset ke data contoh awal? Semua perubahan lokal akan hilang.')) return;
  state = JSON.parse(JSON.stringify(SEED));
  saveState();
  renderCurrentTab();
  toast('Data direset ke contoh awal');
}

/* ============ INIT ============ */
function init(){
  renderNav();
  document.querySelectorAll('.view').forEach(v=> v.classList.toggle('active', v.id==='view-'+currentTab));
  renderCurrentTab();

  document.getElementById('btnExport').addEventListener('click', exportData);
  document.getElementById('btnImport').addEventListener('click', ()=> document.getElementById('importFileInput').click());
  document.getElementById('importFileInput').addEventListener('change', e=>{ if(e.target.files[0]) importData(e.target.files[0]); e.target.value=''; });
  document.getElementById('btnReset').addEventListener('click', resetData);

  document.getElementById('txnCategory').addEventListener('change', e=> populateSubcategorySelect(e.target.value));
  document.querySelectorAll('.type-toggle button').forEach(b=> b.addEventListener('click', ()=> setTxnType(b.dataset.type)));
  document.getElementById('btnTxnSave').addEventListener('click', saveTxnForm);
  document.getElementById('btnTxnCancel').addEventListener('click', closeTxnModal);
  document.getElementById('btnTxnClose').addEventListener('click', closeTxnModal);
  document.getElementById('txnModalOverlay').addEventListener('click', e=>{ if(e.target.id==='txnModalOverlay') closeTxnModal(); });

  document.getElementById('btnAcctSave').addEventListener('click', saveAcctForm);
  document.getElementById('btnAcctCancel').addEventListener('click', closeAcctModal);
  document.getElementById('btnAcctClose').addEventListener('click', closeAcctModal);
  document.getElementById('acctModalOverlay').addEventListener('click', e=>{ if(e.target.id==='acctModalOverlay') closeAcctModal(); });

  document.addEventListener('keydown', e=>{
    if(e.key==='Escape'){ closeTxnModal(); closeAcctModal(); }
  });
}
document.addEventListener('DOMContentLoaded', init);

