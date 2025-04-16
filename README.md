# 🔁 Bidirectional ClickHouse & Flat File Data Ingestion Tool

A web-based application that allows seamless data ingestion between **ClickHouse** and **Flat File** platforms. The application supports bidirectional data flow and provides a user-friendly interface for efficient data transfer.

---

## 🎯 Objective

- Enable **bidirectional data flow** between **ClickHouse** and **Flat Files**.
- Allow users to **select specific columns** for ingestion.
- Handle **JWT token-based authentication** for ClickHouse as a source.
- Provide an interactive **UI** for managing data ingestion.
- **Report total records processed** after ingestion completion.

---

## 🧰 Tech Stack

- **Frontend**: React.js, HTML, CSS
- **Authentication**: JWT (for ClickHouse connection)
- **File Type**: CSV/Flat File

---

## 🚀 Features

## 🚀 Features

- 🔄 Bidirectional data ingestion between ClickHouse and Flat Files
- 🔐 JWT token authentication for ClickHouse
- ✅ Column selection for flexible ingestion
- 📊 Record count display after ingestion
- ⚠️ Basic error handling with status updates

---

## 🖥️ User Interface

- **Source Selection**: Choose data source between ClickHouse or Flat File
- **Configuration Inputs**:
  - **ClickHouse**: Host, Port, Database, User, JWT Token
  - **Flat File**: File name and delimiter
- **Column Listing**: Select the columns to be ingested
- **Ingestion Status**: Displays connecting, fetching, ingesting, and completion status
- **Error Handling**: User-friendly error messages displayed in case of issues

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
# 1️⃣ Clone the repository
git clone https://github.com/mehakkanyal16/Data-Bridge-Blaze.git
cd Data-Bridge-Blaze

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start the development server
npm run dev

