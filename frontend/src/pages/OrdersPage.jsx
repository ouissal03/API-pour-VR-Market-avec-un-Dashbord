import { Container, VStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useOrderStore } from "../store/order";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
  const { fetchOrders, orders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  console.log("Orders in component:", orders); // Debugging

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Orders 🚀
        </Text>

        {/* Vertical Stack for single-column layout */}
        <VStack spacing={6} w="full" align="stretch">
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
              No Orders found 😢
            </Text>
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

export default OrdersPage;
