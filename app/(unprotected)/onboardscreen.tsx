import { View, Text, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import Carousel from "pinar";
import { Image } from 'expo-image';
import { useUserStore } from '@/store/authStore';
import { Redirect } from 'expo-router';

export default function OnboardScreen() {

    const [nextIt, setNextIt] = useState(0);
    const carouselRef = useRef<any>(null);

    const isOnboarded = useUserStore(state => state.isOnboarded);
    const setOnboard = useUserStore(state => state.setOnboard);

    if(isOnboarded) {
        return <Redirect href={"/login"} />
    }

  return (
    <View style={{flex: 1}}>
      <Carousel
        // containerStyle={{flex: 1}}
        ref={carouselRef}
        onIndexChanged={({index, total}) => {setNextIt(index + total);}}
        style={{ flex: 1, paddingVertical: 100 }}
        showsControls={false}
        // dotsContainerStyle={{gap: 20, bottom: 20}}
        activeDotStyle={{backgroundColor: "red", borderWidth: 5, marginHorizontal: 2, borderColor: "rgba(35, 252, 0, 1)", borderRadius: "50%"}}
        dotStyle={{backgroundColor: "red", borderWidth: 5, marginHorizontal: 2, borderColor: "rgba(209, 211, 212, 1)", borderRadius: "50%"}}
      >
        <View style={{alignItems: "center"}}>
            <Image source={require("@/assets/images/f0f7912276884c0ac93059b799831e42.png")} style={{height: 200, width: 280}} />
            <View>
                <Text style={{color: "rgba(35, 252, 0, 1)", fontSize: 24, fontWeight: "600", marginTop: 20, textAlign: "center"}}>Waste Education</Text>
                <Text style={{fontSize: 15, fontWeight: "600", textAlign: "center", marginHorizontal: 40}}>Learn how to reduce and recycle for sustainable future</Text>
            </View>
        </View>

        <View style={{alignItems: "center"}}>
            <Image source={require("@/assets/images/amico2.png")} style={{height: 220, width: 240}} />
            <View>
                <Text style={{color: "rgba(35, 252, 0, 1)", fontSize: 24, fontWeight: "600", marginTop: 20, textAlign: "center"}}>Pickup service</Text>
                <Text style={{fontSize: 15, fontWeight: "600", textAlign: "center", marginHorizontal: 40}}>Convenient waste pick-up at your doorstep for hassle-free recycling</Text>
            </View>
        </View>

        <View style={{alignItems: "center"}}>
            <Image source={require("@/assets/images/amico.png")} style={{height: 280, width: 280}} />
            <View>
                <Text style={{color: "rgba(35, 252, 0, 1)", fontSize: 24, fontWeight: "600", marginTop: 20, textAlign: "center"}}>Reward program</Text>
                <Text style={{fontSize: 15, fontWeight: "600", textAlign: "center", marginHorizontal: 40}}>Get rewarded with points incentitives for your recycling efforts.</Text>
            </View>
        </View>
        </Carousel>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginHorizontal: 20}}>
            <Pressable
            style={{borderWidth: 2, borderColor: "rgba(22, 187, 2, 1)", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50}}
            onPress={() => {setOnboard(true);}}
            >
                <Text style={{color: "rgba(22, 187, 2, 1)", fontWeight: "600"}}>Skip</Text>
            </Pressable>

            <Pressable
            style={{backgroundColor: "rgba(22, 187, 2, 1)", borderWidth: 2, borderColor: "rgba(22, 187, 2, 1)", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50}}
            onPress={() => {
                if(nextIt == 5) {
                    setOnboard(true);
                    return;
                }
                carouselRef.current!!.scrollToNext()
            }}
            >
                <Text style={{color: "white", fontWeight: "600"}}>Next</Text>
            </Pressable>
        </View>
    </View>
  )
}