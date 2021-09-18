import CartItem from "./CartItem";
import Cart from "./Cart";
import Navbar from "./Navbar";
import React from "react";
import firebase from "firebase";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: [],
      loading:true
    };
    this.db=firebase.firestore();
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }

  componentDidMount(){
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot)=>{
    //     console.log(snapshot)
    //     snapshot.docs.map((doc)=>{
    //       console.log(doc.data())
    //     })

    //     const products=snapshot.docs.map((doc)=>{
    //       const data=doc.data();
    //       data['id']=doc.id;

    //       return data;
    //     })

    //     this.setState({
    //       products,
    //       loading:false
    //     })
    //   })

    this.db
      .collection('products')
      // .where("price",">=",1999)
      .orderBy("price")
      .onSnapshot((snapshot)=>{
            console.log(snapshot)
            snapshot.docs.map((doc)=>{
              console.log(doc.data())
            })
    
            const products=snapshot.docs.map((doc)=>{
              const data=doc.data();
              data['id']=doc.id;
    
              return data;
            })
    
            this.setState({
              products,
              loading:false
            })
          })
  }

  handleIncreaseQuantity = (product) => {
    console.log("test");
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //   products
    // });

    const docRef=this.db.collection('products').doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty +1
      })
      .then(()=>{
        console.log("updated successfully");
      })
      .catch((error)=>{
        console.log("error: ",error);
      })

  };

  handleDecreaseQuantity = (product) => {
    console.log("test");
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty != 0) {
      const docRef=this.db.collection('products').doc(products[index].id);
      docRef
        .update({
          qty: products[index].qty - 1
        })
        .then(()=>{
          console.log("updated successfully");
        })
        .catch((error)=>{
          console.log("error: ",error);
        })
    }       
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id);

    // this.setState({
    //   products: items,
    // });
    const docRef=this.db.collection('products').doc(id);
    docRef
      .delete()
      .then(()=>{
        console.log("deleted successfully");
      })
      .catch((error)=>{
        console.log("error: ",error);
      })

  };

  getCartCount= ()=> {
    const {products}=this.state;
    let count=0;

    products.forEach((product) => {
      count+=product.qty;      
    });

    return count;

  }

  getCartTotal = ()=>{
    const{products}=this.state;
    let count=0;

    products.forEach((product)=>{
      count+= (product.qty*product.price);
    });

    return count;
  }

  addProduct=()=>{
    this.db
      .collection('products')
      .add({
        img:'',
        price:999,
        title:'washing machine',
        qty:1
      })
      .then((docRef)=>{
        console.log("product has been added ",docRef)
      })
      .catch((error)=>{
        console.log("eror entering product: ",error);
      })
  }


  render(){
    const {products,loading}=this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a Product</button>
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDeleteProduct}
        />
        {loading && <h1 style={{marginLeft:500}}>LOADING PRODUCTS :-) </h1>}
        <div style={{fontSize:20 ,padding:10}}>
          TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );

  }
}

export default App;
