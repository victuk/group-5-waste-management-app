import { Text, View } from "react-native"

const menu = () => {

    return (
        <View>
            <OtherComponent name="Victor" age={20} userType="admin" />
            <OtherComponent name="Peter" age={25} userType="user" />
        </View>
    );
};


// type Props = {
//     name: string;
//     age: number;
// }

type User = "admin" | "user" | "customer-care"

interface Props {
    name: string;
    age: number;
    userType: User;
}


function OtherComponent({name, age, userType}: Props) {
  return (
    <View>
        <Text>Name:{name}, age: {age}, Usert Type {userType}</Text>
    </View>
  )
}


export default menu