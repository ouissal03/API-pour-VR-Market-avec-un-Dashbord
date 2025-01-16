import { Box, Heading, Text, VStack, useColorModeValue, Button, HStack } from "@chakra-ui/react";

const OrderCard = ({ order }) => {
  // Light and dark mode styles
  const textColor = useColorModeValue("gray.700", "gray.200");
  const bg = useColorModeValue("gray.50", "gray.800");
  const boxBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const productBoxBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      mb={6}
      p={4}
      boxShadow="lg"
      bg={bg}
      _hover={{ transform: "translateY(-5px)", boxShadow: "2xl", cursor: "pointer" }}
      transition="all 0.3s"
      maxWidth="900px" // Increased width
      w="full" // Ensure the box takes full width
      mx="auto" // Center the box
    >
      {/* Order ID in center */}
      <HStack justify="center" mb={4}>
        <Heading as="h3" size="md" color={textColor}>
          Order ID: {order._id}
        </Heading>
      </HStack>

      {/* User info and Products boxes in the same line */}
      <HStack justify="space-between" spacing={6} mb={4}>
        {/* User info Box */}
        <Box p={4} borderRadius="md" border="1px solid" borderColor={borderColor} bg={boxBg} w="45%">
          {order.user ? (
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" color={textColor}>
                <strong>User:</strong> {order.user.name} ({order.user.email})
              </Text>
              <Text fontSize="sm" color={textColor}>
                <strong>Phone:</strong> {order.user.phone}
              </Text>
              <Text fontSize="sm" color={textColor}>
                <strong>Address:</strong> {order.user.address}
              </Text>
            </VStack>
          ) : (
            <Text fontSize="sm" color={textColor}>
              <strong>User Info:</strong> Not available
            </Text>
          )}
        </Box>

        {/* Products Box */}
        <Box p={4} borderRadius="md" border="1px solid" borderColor={borderColor} bg={productBoxBg} w="45%">
          <Heading as="h4" size="sm" color={textColor} mb={2}>
            Products:
          </Heading>
          <VStack align="start" spacing={2}>
            {order.products && order.products.length > 0 ? (
              order.products.map((product) => (
                <Text key={product._id} fontSize="sm" color={textColor}>
                  {product.name} - Quantity: {product.quantity} - Price: ${product.price}
                </Text>
              ))
            ) : (
              <Text fontSize="sm" color={textColor}>
                No products available for this order.
              </Text>
            )}
          </VStack>
        </Box>
      </HStack>

      {/* Status, Date and Total Amount */}
      <HStack justify="space-between" mt={4}>
        <Text fontWeight="bold" fontSize="md" color={textColor}>
          Status: {order.status}
        </Text>
        <Text fontWeight="bold" fontSize="md" color={textColor}>
          Date: {new Date(order.date).toLocaleString()}
        </Text>
        <Button colorScheme="teal" size="sm" variant="outline" alignSelf="flex-start">
          Total Amount: ${order.totalAmount}
        </Button>
      </HStack>
    </Box>
  );
};

export default OrderCard;
