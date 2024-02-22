import { A } from "@solidjs/router";
import { redirect } from "@solidjs/router";
import { For, createEffect } from "solid-js";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  
  DialogDescription
} from "~/components/ui/dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"

import { Textarea } from "~/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import axios, { Axios } from "axios";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { createSignal } from "solid-js";
import { createResource } from "solid-js";

import { FiExternalLink } from 'solid-icons/fi'
const [title,setTitle] = createSignal('')

const [user,setUser] = createSignal('')

const [content,setContent] = createSignal('')






export default function Home() {

  const fetchPosts = async () =>
  (await fetch('http://localhost:5000/getPosts')).json();
  const [data] = createResource(fetchPosts);
 
  createEffect(()=>{
    console.log(data())
  })
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Dialog  >
  <DialogTrigger as={Button}>Post</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="my-2">Post </DialogTitle>
      <DialogDescription>
        <form  onsubmit={async (e)=>{
          
          
          await axios.post('http://localhost:5000/addPost',{
            title:title(),
            user:user(),
            content:content()
          })
          redirect('/')
          
        }}>
        <div class="flex flex-col gap-y-4">
          <Input required  placeholder="Title" onInput={(e)=>{
            setTitle(e.currentTarget.value)
          }}></Input>
          <Input required  placeholder="User"onInput={(e)=>{
            setUser(e.currentTarget.value)
          }}></Input>
          <Textarea required  class="h-48 max-h-48"onInput={(e)=>{
            setContent(e.currentTarget.value)
          }}/>
          <Button class="my-" type="submit">Post</Button>
        </div>
        
     
      
        </form>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>

    </DialogFooter>
  </DialogContent>
</Dialog>

    <div class="flex flex-col items-center m-4 gap-2 ">
    <For each={data()?.record}>{(data) =>
        <>
        <Card class="w-[1000px]"> 
  <CardHeader>
    <CardTitle>{data?.title}</CardTitle>
    <CardDescription><p class='text-gray-400'>{data?.content}</p></CardDescription>
  </CardHeader>

  <CardFooter>
  <Tooltip>
  <TooltipTrigger><FiExternalLink /></TooltipTrigger>
  <TooltipContent>Move</TooltipContent>
</Tooltip>
    
  </CardFooter>
</Card>
        </>
      }</For>
      
    </div>
    </main>
  );
}
