document.addEventListener('DOMContentLoaded', function() {
    const imageGallery = document.getElementById('imageGallery');
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName("close")[0];
    const modalImagesDisplay = document.getElementById('modalImagesDisplay');

    // Placeholder for generating image names. Replace with your actual image names.
    const rawImages = generateImageNames(955); // Assuming 955 images

    rawImages.forEach(imageName => {
        const imgElement = document.createElement('img');
        imgElement.src = `raw_images/${imageName}.jpg`; // Adjust path as necessary
        imgElement.alt = imageName;
        imgElement.onclick = function() {
            modal.style.display = "block";
            displayResults(imageName);
        };
        imageGallery.appendChild(imgElement);
    });

    span.onclick = function() {
        modal.style.display = "none";
        modalImagesDisplay.innerHTML = ''; // Clear modal content
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalImagesDisplay.innerHTML = ''; // Clear modal content
        }
    };

function displayResults(imageName) {
    modalImagesDisplay.innerHTML = ''; // Clear previous images

    // Define the images and captions
    const imagesInfo = [
        { folder: 'raw_images', caption: 'Raw Image' },
        { folder: 'GTs', caption: 'GT' },
        { folder: 'unfinetuned_GSAM_masks', caption: 'Unfinetuned SAM Mask' },
        { folder: 'finetuned_GSAM_masks', caption: 'Finetuned SAM Mask' },
        { folder: 'unfinetuned_G_DINO_boxes', caption: 'Unfinetuned Grounding-Dino (left: GT)' },
        { folder: 'finetuned_G_DINO_boxes', caption: 'Finetuned Grounding-Dino (left: GT)' }
    ];

    // Create two rows
    const topRow = document.createElement('div');
    topRow.className = 'image-row';
    const bottomRow = document.createElement('div');
    bottomRow.className = 'image-row';

    imagesInfo.forEach((info, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        if (index >= 4) { // Apply a different class for bottom row image containers
            imgContainer.classList.add('bottom-row');
        }

        const imgElement = document.createElement('img');
        const extension = info.folder === 'GTs' || info.folder.includes('GSAM_masks') ? '.png' : '.jpg';
        imgElement.src = `${info.folder}/${imageName}${extension}`;
        imgContainer.appendChild(imgElement);

        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.textContent = info.caption;
        imgContainer.appendChild(caption);

        // Decide which row to append based on the image type
        if (index < 4) { // First 4 images go to the top row
            topRow.appendChild(imgContainer);
        } else { // Last 2 images go to the bottom row
            bottomRow.appendChild(imgContainer);
        }
    });

    // Append rows to the modal
    modalImagesDisplay.appendChild(topRow);
    modalImagesDisplay.appendChild(bottomRow);
}
});

function generateImageNames(count) {
    // This is a placeholder. You should replace it with your actual logic to generate image names.
    let names = [];
    for (let i = 1; i <= count; i++) {
        names.push(`image${i}`);
    }
    return names;
}