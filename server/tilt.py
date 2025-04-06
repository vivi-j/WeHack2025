from roboflow import Roboflow
from inference_sdk import InferenceHTTPClient
import os
import csv
import time

rf = Roboflow(api_key="Dz1NoPGGNrd5OUZrmbv3")  
client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="Dz1NoPGGNrd5OUZrmbv3"
)

WORKSPACE_ID = "tilt-workspace"  
PROJECT_ID = "tilt-detection"    
VERSION = 1                      
IMAGE_FOLDERS = ["Images1", "Images2"]  
OUTPUT_CSV = "tilt.csv"
DELAY_SECONDS = 0.5 

def process_image(image_path):
    try:
        result = client.predict(
            image_path,
            model_id=f"{WORKSPACE_ID}/{PROJECT_ID}/{VERSION}"
        )
        return result
    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")
        return None

def get_all_image_files(folders):
    image_files = []
    for folder in folders:
        if os.path.exists(folder):
            for img_file in sorted(os.listdir(folder)):
                if img_file.lower().endswith(('.png', '.jpg', '.jpeg')):
                    image_files.append((folder, img_file))
        else:
            print(f"Warning: Folder {folder} does not exist")
    return image_files

with open(OUTPUT_CSV, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Image Name", "Tilt Value", "Confidence"])
    
    total_images = 0
    processed_images = 0
    errors = 0
    
    all_images = get_all_image_files(IMAGE_FOLDERS)
    total_images = len(all_images)
    
    for folder, img_file in all_images:
        img_path = os.path.join(folder, img_file)
        
        print(f"Processing {folder}/{img_file}...")
        result = process_image(img_path)
        
        if result:
            try:
                predictions = result.get("predictions", [{}])[0]
                
                # Extract tilt value - adjust these keys based on your model's output
                tilt_value = predictions.get("tilt_angle", predictions.get("angle", 0))
                confidence = predictions.get("confidence", 0)
                
                writer.writerow([
                    f"{folder}/{img_file}",
                    f"{tilt_value:.2f}",  # Tilt value with 2 decimal places
                    f"{confidence:.2f}"
                ])
                print(f"✓ Tilt: {tilt_value:.2f}° ({confidence:.2f} confidence)")
                processed_images += 1
            except (KeyError, IndexError) as e:
                writer.writerow([f"{folder}/{img_file}", "0.00", "0.00"])
                print("× Couldn't parse tilt result")
                errors += 1
        
        time.sleep(DELAY_SECONDS)

print(f"\nProcessing complete!")
print(f"Total images found: {total_images}")
print(f"Successfully processed: {processed_images}")
print(f"Errors encountered: {errors}")
print(f"Results saved to {OUTPUT_CSV}")