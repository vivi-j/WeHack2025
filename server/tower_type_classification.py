from roboflow import Roboflow
from inference_sdk import InferenceHTTPClient
import os
import csv
import time

rf = Roboflow(api_key="Sy3DnjVOMrd5GUWrmpv2")
client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="Sy3DnjVOMrd5GUWrmpv2"
)

WORKSPACE_ID = "weee-8dr2p"
WORKFLOW_ID = "detect-and-classify-3"
IMAGE_FOLDER = "123"
OUTPUT_CSV = "tower_classifications.csv"
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

with open(OUTPUT_CSV, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Image", "Class", "Confidence"])
    
    for img_file in sorted(os.listdir(IMAGE_FOLDER)):
        if img_file.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(IMAGE_FOLDER, img_file)
            
            print(f"Processing {img_file}...")
            result = process_image(img_path)
            
            if result:
                try:
                    predictions = result.get("predictions", [{}])[0]
                    class_name = predictions.get("class", "unknown")
                    confidence = predictions.get("confidence", 0)
                    
                    writer.writerow([
                        img_file,
                        class_name,
                        f"{confidence:.2f}"
                    ])
                    print(f"✓ {class_name} ({confidence:.2f})")
                except (KeyError, IndexError) as e:
                    writer.writerow([img_file, "parse_error", "0.00"])
                    print("× Couldn't parse result")
            
            time.sleep(DELAY_SECONDS)

print(f"\nDone! Results saved to {OUTPUT_CSV}")