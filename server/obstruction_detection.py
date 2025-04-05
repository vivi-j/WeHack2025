from pymongo import MongoClient
from datetime import datetime

mongo_client = MongoClient("mongodb+srv://nerellasaigreeshma:tIbe85wGDmPusIXC@towerdata.cyrqhtc.mongodb.net/")
db = mongo_client.TowerData
tower_collection = db.TowerData

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
                    
                    writer.writerow([img_file, class_name, f"{confidence:.2f}"])
                    print(f"✓ {class_name} ({confidence:.2f})")
                    
                    tower_collection.insert_one({
                        "image": img_file,
                        "class": class_name,
                        "confidence": confidence,
                    })
                    
                except (KeyError, IndexError) as e:
                    writer.writerow([img_file, "parse_error", "0.00"])
                    print("× Couldn't parse result")
            
            time.sleep(DELAY_SECONDS)