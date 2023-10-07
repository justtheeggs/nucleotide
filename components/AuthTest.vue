<template>
    
</template>

<script setup >
import { TRPCError } from '@trpc/server';



const { $client } = useNuxtApp()

const test = async () => {
    try {
        const values = await $client.root.auth_test.mutate()   
    } catch(e) {
        if (e instanceof TRPCError) {
            if(e.shape.message == "AUTHORIZED") {
                alert("You are authorized!")
            } else {
                alert("You are not authorized!")
            }
        } else {
            alert(e.message)
        }
    }    
}
</script>
