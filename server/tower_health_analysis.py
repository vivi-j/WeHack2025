import os
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('server\\tower_types.csv', encoding='ISO-8859-1')
label_counts = df['Label'].value_counts()
colors = ['#800000', '#D06A6A', '#F19C9C', '#FFB6C1']
plt.figure(figsize=(10, 6))
label_counts.plot(kind='bar', color=colors)

plt.title('Tower Types Distribution')
plt.xlabel('Tower Type')
plt.ylabel('Number of Images')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.savefig('tower_types.jpg')

images_folder = 'nest_images'
image_names = [os.path.splitext(image)[0] for image in os.listdir(images_folder)]

print("Columns in the CSV file:", df.columns)
filtered_df = df[df['ï»¿Image Name'].isin(image_names)]

label_counts = filtered_df['Label'].value_counts()

plt.figure(figsize=(10, 6))
label_counts.plot(kind='bar', color=['#800000', '#D06A6A', '#F19C9C', '#FFB6C1'])

plt.title('Nest Images Tower Types Distribution')
plt.xlabel('Tower Type')
plt.ylabel('Number of Images')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()

plt.savefig('nest_tower_types.jpg')

plt.show()