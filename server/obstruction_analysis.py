import pandas as pd
import shutil
import os

df = pd.read_csv('server\obstruction.csv')

if not os.path.exists('nest_images'):
    os.makedirs('nest_images')

for _, row in df.iterrows():
    if row['Label'] == 'nest':
        if int(row['Image Name'][3:]) <= 50:
            image_folder = 'server\Images1'
        else:
            image_folder = 'server\Images2'

        image_path = os.path.join(image_folder, row['Image Name'] + '.jpg')
        
        if os.path.exists(image_path):
            shutil.copy(image_path, os.path.join('nest_images', row['Image Name'] + '.jpg'))
        else:
            image_path = os.path.join(image_folder, row['Image Name'] + '.webp')
            if os.path.exists(image_path):
                shutil.copy(image_path, os.path.join('nest_images', row['Image Name'] + '.webp'))
            else:
                print(f"Image not found: {image_path}")