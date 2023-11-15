import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "nexus-typegen";

export const ProductType = objectType({
    name: 'Product',
    definition(t) {
        t.nonNull.int('id'),
        t.nonNull.string('productName'),
        t.nonNull.float('productPrice')
    },
});

let products: NexusGenObjects["Product"][] = [
    {
        id: 1,
        productName: 'Test 1',
        productPrice: 58.14
    },
    {
        id: 2,
        productName: 'Test 2',
        productPrice: 120.00
    },
]

export const ProductsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('products', {
            type: "Product",
            resolve(_parent, _args, _context, _info) {
                return products;
            }
        })
    },
})

export const CreateProductMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createProducts', {
            type: "Product",
            args: {
                productName: nonNull(stringArg()),
                productPrice: nonNull(floatArg())
            },
            resolve(_parent, args, _context, _info) {
                const {productName, productPrice} = args;
                const product = {
                    id: +Date.now().toString().slice(-6),
                    productName,
                    productPrice
                }
                products.push(product);
                return product;
            }
        })
    },
})