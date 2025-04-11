import React, { useState } from "react";

function CreateListing({ onListingCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    tags: "",
    image: null, // Store the uploaded file
    date: new Date().toISOString().split("T")[0], // Automatically set the current date
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Store the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("image", formData.image); // Append the file
    formDataToSend.append("date", formData.date);

    try {
      const response = await fetch("http://localhost:8000/home", {
        method: "POST",
        body: formDataToSend, // Send as FormData
      });
      if (response.ok) {
        const newListing = await response.json();
        onListingCreated(newListing);
        setFormData({
          name: "",
          price: "",
          description: "",
          tags: "",
          image: null,
          date: new Date().toISOString().split("T")[0], // Reset the date
        }); // Reset the form
      } else {
        console.error("Failed to create listing");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={formData.tags}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        required
      />
      <input type="date" name="date" value={formData.date} readOnly />
      <button type="submit">Create Listing</button>
    </form>
  );
}

export default CreateListing;
