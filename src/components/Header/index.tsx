import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, OrderContent, OrderHeader, OrderTable } from "./styles";

interface HeaderProps{
    selectedTable:string
    onCancel: ()=> void
}

export function Header({selectedTable, onCancel}:HeaderProps) {
    return (
        <Container>
            {selectedTable ?
                <OrderContent>
                    <OrderHeader>
                        <Text size={24} weight={"600"}>
                        Pedido
                        </Text>
                        <TouchableOpacity onPress={onCancel}>
                            <Text size={14}  weight={"600"} color={"#d73035"}>
                            cancelar pedido
                            </Text>
                        </TouchableOpacity>
                    </OrderHeader>
                    <OrderTable>
                        <Text color={"#666"} >Mesa {selectedTable}</Text>
                    </OrderTable>
                </OrderContent>
                :
                <>
                    <Text size={14} opacity={0.9}>
                Bem-vindo(a) ao{" "}
                    </Text>
                    <Text size={24} weight="700">
                WAITER
                        <Text size={24}>APPP</Text>
                    </Text>
                </>
            }

        </Container>
    );
}
