# Generations Connect Platform – Project Setup Guide and other informations

## 🌐 Access the Application

- **Frontend**: https://localhost
- **Backend API**: https://localhost/generation-connect-api
- **Swagger UI**: https://localhost/generation-connect-api/swagger-ui/index.html

> **Note**: Swagger UI is protected, therefore only ADMIN or Member of the Generation could only access it.
---

## ⚙️ Prerequisites

Before starting, ensure your system meets the following requirements:

> **Note**: The project includes shell scripts for setup. A **Linux environment** is recommended for smooth execution.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (v6 or above)
- [Maven](https://maven.apache.org/install.html)

---

## 🚀 Steps to Run the Project

### 1. Clone the Repository

```bash
    git clone https://campus.cs.le.ac.uk/gitlab/pgt_project/24_25_spring/pm455.git
    cd pm455
```

> **Note**: Use **main project tree-based scripts only**.

---

### 2. Configure SMTP for Email Invites

Edit the file: `src/main/resources/application.properties`  
Add your **Google email credentials**:

```properties
spring.mail.username=add-your-mail-id       # Replace with your Google mailId
spring.mail.password=add-app-password       # Replace with Google's app-specific password
```

---

### 3. Add OpenAI API Key

Also in `application.properties`, configure your OpenAI credentials:

```properties
openai.api.key=add-openai-key           # Replace with your openai-api key of paid version of `gpt-3.5-turbo`
openai.api.url=https://api.openai.com/v1/chat/completions
```

---

### 4. Run Bootstrap Script

This will initialize both frontend and backend setups.

```bash
  ./scripts/bootstrap.sh
```

---

### 5. Start the Application

This will trigger the `docker-compose.yml` in the project root and spin up all configured services.

```bash
  ./scripts/start.sh
```

### 6. Run the script to create Admin user

Install Postgres Client : Ubuntu / Debian

```
sudo apt update
sudo apt install postgresql-client
```
📌 For other operating systems, visit:
https://www.postgresql.org/download/


Connect to the PostgreSQL Database:
```
psql -h localhost -p 5432 -U gc-user -d gc-db
```
When prompted, enter the password input gc-password

Insert Admin User

```sql
INSERT INTO public.user_entity
(email_id, date_of_birth, first_name, generation_connect_admin, last_name, "password")
VALUES('admin@gc.ac.in', NULL, NULL, true, NULL, '$2a$10$60VMr.q8Pkhecq/0Qw.9reTDtxEmXPbfdlY63FXcGchCOgRu3FQ3O');
```

---

### 7. Clean Up the Application

This script cleans containers and images created during setup.

```bash
  ./scripts/cleanup.sh
```

---

### 8. Stop All Running Services

Use this command to stop active Docker containers.

```bash
  ./scripts/stop.sh
```

---

### 9. [Optional] Remove Docker Volumes

> ⚠ Use with caution – this will delete databases and all persistent volumes.

```bash
  docker volume rm $(docker volume ls -q)
```

---

## ✅ You're all set!

Open your browser and navigate to [`https://localhost`](https://localhost) to start using Generations Connect!

---

### 🔐 Accepting Self-Signed Certificate

To proceed with `https://localhost`, accept the self-signed certificate in your browser:

- In Chrome: Click **Advanced** → **Proceed to localhost (unsafe)**
- In Firefox: Click **Advanced** → **Accept the Risk and Continue**

---

## 🧑‍💻 Author & Contributions

This project was designed and developed by **[Purnima Maheshwari](https://github.com/code-black04)**  
If you use or adapt this project, please credit this repository and author

---

## 📄 Documentation and Citations
All citations and references are included in the **[Technical Document](https://github.com/code-black04/generations-connect)** folder as part of the technical documentation.

---

### Note 

SSL Certificates creation is detailed in Technical Documentation pdf file.

---
