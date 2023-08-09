1-Clone the Repository:

Open your terminal or command prompt and navigate to the directory where you want to store the project. Then, use the git clone command to clone the repository.

git clone https://github.com/salilthegreat/chatX.git

2-Install Dependencies:

Navigate into the  repository's directory using the terminal:

for client
cd chatx  
for server
cd server 

Once you are inside the repository's directory, you'll likely need to install project dependencies. 

npm install

3-Configure Environment Variables:

 you'll need to create a .env file in server of the project and add the following variables.


MONGO_URL=
JWT_SECRET=
CLOUD_NAME =
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=




4-Run the Application:

Use npm start to run the application.

5-Creating the build

npm run build

use this code inside server.js

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


Deploying the Server (Node.js and Express) Side:


1-Install Heroku CLI:

Download and install the Heroku Command Line Interface (CLI) from https://devcenter.heroku.com/articles/heroku-cli.

2-Login to Heroku:

Open your terminal and run the following command to log in to your Heroku account:

heroku login

3-Create a Git Repository 

 initialize a Git repository:

git init

4-Commit  Server Code:

Commit the server code to the Git repository:

git add .
git commit -m "Initial commit"

5-Navigate to the Server's Directory:

Open  terminal and navigate to the server directory 

Create a file named Procfile (with no file extension) in your server's root directory. The Procfile tells Heroku how to run your server.

4-Add the following line to your Procfile:

makefile
web: node index.js


5-Push to Heroku:

Run the following commands to deploy the server to Heroku:

heroku create chatX
git push heroku master

6-Access the Deployed Server:

Once the deployment is successful, you'll receive a URL for your deployed server. You can access the deployed server using that URL.

Deploying the Client (React) Side:

1-Build Your React App:

Create a production build of the React app:

npm run build
This will generate a build directory with optimized and minified files.

Navigate to the Client's Build Directory:

cd chatx

Create a Static Server (Express) for Client:

To serve your React build files, you'll need to create a simple Express server. Create a file named server.js in your client's build directory with the following content:





