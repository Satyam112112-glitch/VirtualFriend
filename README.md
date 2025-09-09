### To run this project on a local computer, follow these steps:

#### 1\. Prerequisites 📋

  * **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
  * **Git**: You need Git to clone the repository. Download it from [git-scm.com](https://git-scm.com/).

-----

#### 2\. Clone the Repository 📥

Open your terminal or command prompt and navigate to the directory where you want to save the project. Then, run the following command:

```bash
git clone https://github.com/Satyam112112-glitch/VirtualFriend.git
cd VirtualFriend
```

-----

#### 3\. Set Up the Backend 🤖

The chatbot needs a backend to connect to the Google Gemini API.

  * **Get a Gemini API Key**: Go to the [Google AI Studio](https://aistudio.google.com/app/apikey) and create a new API key.
  * **Create the `.env` file**: In the `backend` folder, create a new file named `.env`.
  * **Add your API Key**: Paste the following line into the `.env` file, replacing `"YOUR_API_KEY_HERE"` with the key you just generated:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```
  * **Install Dependencies**: Navigate to the `backend` folder in your terminal and install the required packages:
    ```bash
    cd backend
    npm install
    ```
  * **Start the Server**: Run the following command to start the backend server:
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000`. Keep this terminal window open.

-----

#### 4\. Run the Frontend 🌐

The frontend is a simple web page.

  * **Open the HTML File**: Navigate to the project's root folder and simply open the `index.html` file in your web browser. You can do this by double-clicking the file or by dragging it into the browser window.

Your chatbot is now fully functional on your local machine.
