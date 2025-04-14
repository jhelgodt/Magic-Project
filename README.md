# Deckhaven 🧙‍♂️

**Deckhaven** is a web-based tool for building, browsing, and managing **Commander decks** for _Magic: The Gathering_. Whether you're a seasoned player or just starting out, Deckhaven helps you organize your decklists with ease — and explore what others are brewing.

Live version 👉 [Visit Deckhaven](https://jhelgodt.github.io/Magic-Project)

---

## 🔧 Tech Stack

- **Angular** (Frontend)
- **Node.js & Express** (Backend)
- **MongoDB** (Database)
- **Scryfall API** (Card data)
- **GitHub Actions** for CI/CD
- **GitHub Pages** for frontend hosting
- **Render** for backend deployment

---

## 🚀 Features

- ✅ Browse public Commander decks
- 🛠️ Create your own deck and save it
- 🔍 Search and add cards via Scryfall
- 🧾 Import card lists in bulk ("1x Card Name")
- 🔐 Login with Google to manage private decks

---

## 🖥️ How to Use

You can explore public decks and build your own directly on the [live site](https://jhelgodt.github.io/Magic-Project). No installation needed!

If you want to run it locally:

```bash
# Clone repo
$ git clone https://github.com/jhelgodt/Magic-Project.git

# Frontend setup
$ cd frontend
$ npm install
$ ng serve

# Backend setup
$ cd ../backend
$ npm install
$ npm run dev
```

> ⚠️ You will need a `.env` file with MongoDB URI and OAuth credentials for login to work.

---

## ✍️ Author

Made with 🧡 by **Joakim Helgodt**  
Feel free to connect on [LinkedIn](https://www.linkedin.com/in/joakimhelgodt/)

---

## 📜 License

MIT
