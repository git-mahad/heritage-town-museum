# Media Gallery Page

A responsive and interactive media gallery built with HTML and CSS, designed to work seamlessly across mobile, tablet, and desktop devices.

## 📁 Project Structure

📁 project-root/ │ ├── index.html ├── media.html ├── contact.html ├── styles.css └── README.md


## 🎯 Features

- **Responsive Layout**: Adapts beautifully to mobile, tablet, and desktop screen sizes using media queries.
- **Media Filtering**: Dropdown-based filter UI for sorting media.
- **Featured Image**: Highlighted larger image section.
- **Thumbnail Grid**: Clickable thumbnails arranged in flexible columns depending on screen size.
- **Pagination**: Clean and interactive pagination links.
- **Virtual Tour**: Embedded iframe section for virtual experiences.
- **Active Navigation Tab**: Highlights the currently active tab in the navigation bar.

## 💅 Styling Highlights

- Uses `@media` queries at:
  - `min-width: 768px` for tablets
  - `min-width: 1024px` for desktops

## 📱 Responsive Behavior

- **Mobile (default)**: Stack layout with 3-column thumbnails.
- **Tablet (≥768px)**: Improved spacing, 4-column thumbnails.
- **Desktop (≥1024px)**: Maximum layout width, 6-column thumbnails, enhanced padding.

## 🖼️ Replace Placeholder Content

> ⚠️ **Important Customizations Required Before Deployment**

### 1. Replace Placeholder Images & Logo
This project includes sample images and a generic logo.

- Update all `<img src="...">` tags with your **original content**.
- Optimize images for better performance.
- Replace logo with your brand asset.

### 2. Replace Dummy Social Media Links
In `contact.html`, the "Follow Us" section uses dummy `#` links.  
You **must update** these with your **actual social media URLs**, for example:

```html
<a href="https://instagram.com/yourhandle" target="_blank">Instagram</a>
