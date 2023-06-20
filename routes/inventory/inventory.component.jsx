import { useState, useContext } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native"
import { AuthContext } from "../../contexts/auth.context";

const Inventory = () => {

    const { userId, jwtToken } = useContext(AuthContext);

    const [catName, setCatName] = useState('');
    const [catDescription, setCatDescription] = useState('');

    const addCategoryHandler = () => {
        const categoryData = {
            name: catName,
            description: catDescription
        };

        fetch('http://10.0.2.2:3000/users/create-category', {
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


    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [prodQuantity, setProdQuantity] = useState('');
    const [prodPrice, setProdPrice] = useState('');

    const addProductHandler = () => {
        const productData = {
            name: prodName,
            description: prodDescription,
            quantity: prodQuantity,
            price: prodPrice
        }

        fetch('http://10.0.2.2:3000/users/create-product', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
                'X-User-Id': userId
            },
            body: JSON.stringify(productData)
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

            <Text>add new product</Text>

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