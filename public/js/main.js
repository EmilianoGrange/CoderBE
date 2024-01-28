const socket = io();

const table = document.querySelector('#rpTable');

const form = document.querySelector('#createForm');

const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
        method: 'delete'
    }).then(() => {
        Toastify({
            text: 'Producto eliminado!',
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #5f2c82, #49a09d)"
            }
        }).showToast();
    }).then(() => fetch('/api/products'))
        .then(res => res.json())
        .then(res => {
            socket.emit('productList', res.productos);
        }).catch((error) => {
            console.log(error)
        })
}

document.addEventListener('DOMContentLoaded', () => {
    const btnsDel = document.querySelectorAll(".eliminar");

    btnsDel.forEach(btn => {
        btn.addEventListener("click", () => deleteProduct(btn.id))
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    body = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        price: document.querySelector('#price').value,
        code: document.querySelector('#code').value,
        stock: document.querySelector('#stock').value,
        category: document.querySelector('#category').value
    }

    fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        Toastify({
            text: 'Producto creado!',
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #5f2c82, #49a09d)"
            }
        }).showToast();
        form.reset();
    }).then(() => fetch('/api/products'))
        .then(res => res.json())
        .then(res => {
            socket.emit('productList', res.productos);
        }).catch((error) => {
            console.log(error)
        })
});

socket.on('updatedProducts', data => {
    table.innerHTML = ''
    data.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td><button class="btn btn-danger eliminar" id="${product.id}">Eliminar</button></td>`
        table.appendChild(tr);
    });

    const btnsDel = document.querySelectorAll(".eliminar");

    btnsDel.forEach(btn => {
        btn.addEventListener("click", () => deleteProduct(btn.id))
    });
});