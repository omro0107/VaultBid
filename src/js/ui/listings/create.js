import { createListing } from "../../api/listings/create.js";


export async function onCreateListing(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("item-description").value;
    const dateTime = new Date(document.getElementById("date-time").value).toISOString();
    const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());

    const media = Array.from(document.querySelectorAll(".image-upload")).map(upload => {
        const url = upload.querySelector('input[name="imageURL"]').value;
        const alt = upload.querySelector('input[name="imageAltText"]').value;
        return { url, alt };
    });

    try {
        const result = await createListing({
            title,
            description,
            tags,
            media,
            endsAt: dateTime
        });

        console.log("Listing created successfully:", result);
        alert("Listing created successfully!");
        window.location.href = "/";
    } catch (error) {
        console.error("Error creating listing:", error);
        alert("Failed to create listing. Please try again.");
    }
}