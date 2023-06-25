import { useState, useContext, useEffect } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { AuthContext } from "../../contexts/auth.context";
import { launchImageLibrary } from 'react-native-image-picker';

const Inventory = () => {

    const { userId, jwtToken } = useContext(AuthContext);

    const [catName, setCatName] = useState('');
    const [catDescription, setCatDescription] = useState('');

    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const addCategoryHandler = () => {
        const categoryData = {
            name: catName,
            description: catDescription
        };

        fetch('http://10.0.2.2:3000/inventory/create-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
                'X-User-Id': userId
            },
            body: JSON.stringify(categoryData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create category');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/inventory/get-categories`,
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`,
                            'X-User-Id': userId,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, [userId, jwtToken]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(
                    'http://10.0.2.2:3000/inventory/get-all-products',
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`,
                            'X-User-Id': userId,
                        }
                    }
                )
                if (!response.ok) {
                    throw new Error('Failed to fetch all products');
                }

                const data = await response.json();
                setAllProducts(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllProducts();
        console.log(allProducts);
    }, [userId, jwtToken])


    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [prodQuantity, setProdQuantity] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const addProductHandler = () => {
        const productData = new FormData();
        productData.append('name', prodName);
        productData.append('description', prodDescription);
        productData.append('quantity', prodQuantity);
        productData.append('price', prodPrice);
        productData.append('categoryId', selectedCategory);
        productData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg', // Adjust the type accordingly if necessary
            name: 'profile.jpg', // You can change the name if desired
        });

        fetch('http://10.0.2.2:3000/inventory/create-product', {
            method: 'POST',
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${jwtToken}`,
                'X-User-Id': userId
            },
            body: productData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create category');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .then(error => {
                console.error(error);
            })
    }
    const openImageLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image selection');
            } else if (response.errorCode) {
                console.log('Image Selection Error: ', response.errorMessage);
            } else {
                // Handle the selected image or video here
                setSelectedImage(response.assets[0].uri);
            }
        });
    };
    return (
        <View>
            {/* <Text>add new category</Text>

            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Category Name"
                    value={catName}
                    onChangeText={setCatName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Category Description"
                    value={catDescription}
                    onChangeText={setCatDescription}
                />
                <TouchableOpacity onPress={addCategoryHandler} style={styles.btn}>
                    <Text style={styles.btnText}>Add Category</Text>
                </TouchableOpacity>
            </SafeAreaView> */}

            <Text>
                <Text style={styles.heading}>Categories:</Text>
                {categories.map((category) => (
                    <View key={category.id} style={styles.category}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <Text style={styles.categoryDescription}>
                            {category.description}
                        </Text>
                    </View>
                ))}
            </Text>

            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Product Name"
                    value={prodName}
                    onChangeText={setProdName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Product Description"
                    value={prodDescription}
                    onChangeText={setProdDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Product Quantity"
                    value={prodQuantity}
                    onChangeText={setProdQuantity}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Product Price"
                    value={prodPrice}
                    onChangeText={setProdPrice}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Category Id"
                    value={selectedCategory}
                    onChangeText={setSelectedCategory}
                />
                <TouchableOpacity style={styles.btn} onPress={openImageLibrary}>
                    <Text style={styles.btnText}>Select Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addProductHandler} style={styles.btn}>
                    <Text style={styles.btnText}>Add Product</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        marginTop: 100,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    btn: {
        height: 40,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#FFFFFF',
    }
});

export default Inventory;