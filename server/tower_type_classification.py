from roboflow import Roboflow
from inference_sdk import InferenceHTTPClient
import os
import csv
import time

# Initialize Roboflow client
rf = Roboflow(api_key="Sy3DnjVOMrd5GUWrmpv2")
client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="Sy3DnjVOMrd5GUWrmpv2"
)

# Configuration
WORKSPACE_ID = "weee-8dr2p"
WORKFLOW_ID = "detect-and-classify-3"
IMAGE_FOLDERS = ["Images1", "Images2"]  
OUTPUT_CSV = "tower_types.csv"
DELAY_SECONDS = 0.5 

def process_image(image_path):
    try:
        result = client.run_workflow(
            workspace_id=WORKSPACE_ID,
            workflow_id=WORKFLOW_ID,
            image_path=image_path
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
    writer.writerow(["Image Name", "Label", "Confidence"])
    
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
                class_name = predictions.get("class", "unknown")
                confidence = predictions.get("confidence", 0)
                
                writer.writerow([
                    f"{folder}/{img_file}",  
                    class_name,
                    f"{confidence:.2f}"
                ])
                print(f"✓ Detected: {class_name} ({confidence:.2f} confidence)")
                processed_images += 1
            except (KeyError, IndexError) as e:
                writer.writerow([f"{folder}/{img_file}", "parse_error", "0.00"])
                print("× Couldn't parse result")
                errors += 1
        
        time.sleep(DELAY_SECONDS)

print(f"\nProcessing complete!")
print(f"Total images found: {total_images}")
print(f"Successfully processed: {processed_images}")
print(f"Errors encountered: {errors}")
print(f"Results saved to {OUTPUT_CSV}")