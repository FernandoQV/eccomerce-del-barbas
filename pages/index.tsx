import {
  Button,
  Grid,
  GridItem,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import React, { useState } from "react";
import api from "../src/product/api";
import { IProduct } from "../src/product/IProduct";
import { parseCurrency } from "../src/utils/currency";

interface Props {
  products: IProduct[];
}
const IndexRoute: React.FC<Props> = ({ products }: Props) => {
 
  const [cart, setCart] = useState<IProduct[]>([]);
  const text = React.useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
          ``,
        )
        .concat(
          `\nTotal: ${parseCurrency(cart.reduce((total, product) => total + (product.price), 0))}`,
        ),
    [cart],
  );
  return (
    <Stack direction={"column"} alignItems={"center"} width={"100vw"}>
      <Grid
        padding={16}
        gap={8}
        templateColumns={"repeat(auto-fit,minmax(300px,1fr))"}
        width={"full"}
      >
        {products.map((product: IProduct) => (
          <GridItem bgColor={"gray.100"} key={product._id} borderRadius={8}>
            <Stack padding={4}>
              <Image
                src={product.image}
                alt={product.category}
                height={"150px"}
                objectFit={"cover"}
              />
              <Text>{product.title}</Text>
              <Text color={'secondary.400'} fontWeight={'medium'}>{parseCurrency(product.price)}</Text>
              <Button
                borderRadius={4}
                colorScheme={"primary"}
                onClick={() => setCart((cart) => [...cart, product])}
              >
                Agregar Carrito
              </Button>
            </Stack>
          </GridItem>
        ))}
      </Grid>
      {Boolean(cart.length) && (
        <Button
          as={Link}
          href={`https://wa.me/51921375227?text=${encodeURIComponent(text)}`}
          isExternal
          colorScheme={"whatsapp"}
          maxWidth={"sm"}
        >
          {`Completar pedido (${cart.length})`}
        </Button>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
export default IndexRoute;
