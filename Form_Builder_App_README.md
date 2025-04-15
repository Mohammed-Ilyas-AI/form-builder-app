
# Form Builder Application

## 📌 Overview
This Form Builder Application allows users to **create**, **edit**, and **preview** forms dynamically using an intuitive drag-and-drop interface. It simplifies managing field groups and form elements, providing a seamless user experience with features like **form export**, **import**, and **local storage integration**.

### 🚀 Key Features:
- **Drag-and-Drop Form Creation**: Easily add, rearrange, and remove form elements using Angular CDK’s drag-and-drop functionality, ensuring smooth user interactions.
- **Customizable Field Groups**: Create, copy, and delete field groups to structure your forms with ease.
- **Dynamic Form Rendering**: See an instant preview of the form as you build it.
- **Local Storage Integration**: Your forms and preferences are saved locally, so you can continue editing them later.
- **Export & Import Forms**: Share and reuse forms seamlessly by exporting and importing them.
  
### 🛠️ Technologies Used:
- **Angular**: The front-end framework that powers the dynamic UI.
- **Angular CDK Drag-and-Drop**: Provides an easy-to-use and highly customizable drag-and-drop interface for form elements.
- **RxJS**: Reactive state management for real-time updates.
- **Local Storage**: To persist user preferences and form data.
- **Native Drag-and-Drop**: We’ve also integrated native drag-and-drop support for enhanced performance and compatibility.

## 🏗 Project Structure
```
📂 src/
 ├── 📁 components
 │   ├── 📜 app.component.html/.ts
 │   ├── 📜 left-pane.component.html/.ts
 │   ├── 📜 right-pane.component.html/.ts
 │   ├── 📜 middle-pane.component.html/.ts
 ├── 📁 models
 │   ├── 📜 field-group.ts
 │   ├── 📜 form-element.ts
 ├── 📁 services
 │   ├── 📜 field-group.service.ts
 │   ├── 📜 form-element.service.ts
 │   ├── 📜 local-storage.service.ts
 │   ├── 📜 field-properties.service.ts
 ├── 📁 features
 │   ├── 📜 form-preview.component.html/.ts
 │   ├── 📜 form-renderer.component.html/.ts
 │   ├── 📜 right-drawer.component.html/.ts
 ├── 📁 assets
 │   ├── 📜 form-elements.json
 │   ├── 📜 field-properties.json
```

### 🎯 Getting Started

#### 1️⃣ Prerequisites
Make sure you have the following installed:
- **Node.js** (LTS version recommended)
- **Angular CLI** (install using `npm install -g @angular/cli`)

#### 2️⃣ Installation
To get started with the project:
```bash
git clone <repo-url>
cd form-builder-app
npm install
ng serve
```

Once installed, open the browser and go to **http://localhost:4200**.

#### 3️⃣ Usage
- **Create a Field Group**: Add a new field group using the UI.
- **Add Form Elements**: Drag elements from the right pane and drop them into the middle pane.
- **Edit Field Properties**: Use the right drawer to modify properties of selected fields.
- **Save and Export**: Save your form to local storage or export it for sharing and reuse.
- **Preview the Form**: View the form in real-time and make any necessary changes before submitting.

### 📦 Deployment
To build the application for production:
```bash
ng build --prod
```
After building, deploy the contents of the `/dist` folder to any static web server.

### 📝 Contribution
We welcome contributions! If you’d like to enhance the project:
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Make your changes.
4. Push the branch and submit a Pull Request.

### 📧 Contact
For inquiries, contact us at:  
📩 ilyas.fa007@gmail.com
