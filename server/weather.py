from roboflow import Roboflow
import os
import csv

rf = Roboflow(api_key="Sy3DnjVOMrd5GUWrmpv2")
project = rf.workspace("weatherdataset").project("weather-lidsb")
model = project.version(1).model

folders = ["Images1", "Images2"]
output_csv = "environment.csv"

with open(output_csv, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Image Name", "Label", "Confidence"])
    
    for folder in folders:
        for image_file in os.listdir(folder):
            if image_file.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_path = os.path.join(folder, image_file)
                try:
                    prediction = model.predict(image_path).json()
                    if 'predictions' in prediction and prediction['predictions']:
                        pred = prediction['predictions'][0]
                        class_name = pred.get('class', pred.get('predicted_class', 'unknown'))
                        confidence = pred.get('confidence', 0)
                        writer.writerow([f"{folder}/{image_file}", class_name, f"{confidence:.2f}"])
                        print(f"{folder}/{image_file}: {class_name} ({confidence:.2f})")
                    else:
                        writer.writerow([f"{folder}/{image_file}", "no_prediction", "0.00"])
                except Exception as e:
                    writer.writerow([f"{folder}/{image_file}", "error", "0.00"])
                    print(f"Error processing {folder}/{image_file}")

print(f"Results saved to {output_csv}")