import pickle

with open("dreambank_bilstm_system.pkl", "rb") as f:
    obj = pickle.load(f)

print("Type of object:", type(obj))
if isinstance(obj, dict):
    print("Keys inside pickle:", obj.keys())
else:
    print(obj)
