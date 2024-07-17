# Sanity Esports

Sanity Esports is an open-source platform designed to host and manage gaming tournaments. It provides a seamless experience for organizers, players, and viewers, ensuring efficient management and high engagement. This repository contains the source code, documentation, and resources necessary to run your own esports tournaments.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Features

- **Tournament Management**: Create, manage, and track various types of gaming tournaments.
- **User Registration**: Allow users to register and participate in tournaments.
- **Bracket Generation**: Automatic generation of tournament brackets and match scheduling.
- **Live Updates**: Real-time updates of match results and leaderboards.
- **Notifications**: Email and in-app notifications for important events and updates.
- **Analytics**: Insights and analytics for tournament performance and user engagement.
- **Customizable**: Flexible settings to customize tournament rules, formats, and visuals.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/dinxsh/sanity.git
   cd sanity
   ```

2. **Install NPM packages:**

   ```sh
   npm install
   ```

3. **Set up your environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
    DATABASE_URL
    MONGODB_URL=
    RESEND_API_KEY=
    NEXTAUTH_SECRET=
   ```

### Running the Application

1. **Start the development server:**

   ```sh
   npm start
   ```

2. **Open your browser and navigate to:**

   ```plaintext
   http://localhost:3000
   ```

## Usage

### Creating a Tournament

1. Log in as an organiser.
2. Navigate to the "Create Tournament" page.
3. Fill in the tournament details, such as name, game, format, and rules.
4. Click "Create" to publish the tournament.

### Registering for a Tournament

1. Log in to your account.
2. Browse the available tournaments.
3. Select a tournament and click "Register."
4. Follow the on-screen instructions to complete your registration.

## Configuration

### Customization

To customize the application, modify the following files:

- **Frontend:** `src/components/` and `src/styles/`
- **Backend:** `src/api/` and `src/auth/`

Refer to the [documentation](docs/configuration.md) for detailed customization instructions.

## Contributing

We welcome contributions from the community! To get started, please read our [Contributing Guide](CONTRIBUTING.md).

### Fork the Repository

1. Fork the project on GitHub.
2. Clone your fork locally:

   ```sh
   git clone https://github.com/dinxsh/sanity-esports.git
   cd sanity-esports
   ```

3. Create a new branch for your feature or bug fix:

   ```sh
   git checkout -b feature/your-feature-name
   ```

4. Commit your changes and push to GitHub:

   ```sh
   git commit -m "Add your commit message here"
   git push origin feature/your-feature-name
   ```

5. Create a pull request on the original repository.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- **Project Maintainer:** Your Name - [dineshtalwadker@gmail.com](mailto:dineshtalwadker@gmail.com)
- **GitHub Repository:** [Sanity Esports - Dinesh](https://github.com/dinxsh/sanity)

---

Feel free to modify this template according to your project's specifics and needs. Adding screenshots, diagrams, and links to additional documentation can also enhance the README.
