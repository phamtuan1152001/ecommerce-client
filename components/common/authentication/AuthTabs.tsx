"use client"
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { Box } from "@/components/ui/box"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// @selector-open-dialog
import { getIsOpenDialog } from '@/redux/openDiaglog/selector';
import { closeDialog, openDiaglog } from '@/redux/openDiaglog/action';

interface Props {
	// setOpen: (a:boolean) => void
	setOpen: any
}

const AuthTabs = ({ setOpen }: Props) => {
	const dispatch = useDispatch()

	const isOpen = useSelector(getIsOpenDialog);

	const handleOpenDialog = () => {
		if (isOpen) {
			dispatch(closeDialog())
		} else {
			dispatch(openDiaglog())
		}
	}

	return (

		<div className=' basis-1/2'>
			<Box className=" px-12 h-full rounded-r-[8px] max-[768px]:p-0">
				<div className="flex flex-row justify-end items-center">
					<Button className="bg-inherit p-1" onClick={() => handleOpenDialog()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M6.75729 17.2426L11.9999 12M17.2426 6.75736L11.9999 12M11.9999 12L6.75729 6.75736M11.9999 12L17.2426 17.2426" stroke="#676767" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</Button>
				</div>
				<div>
					<Tabs defaultValue='signin'>
						<TabsList className='w-full flex p-0 bg-transparent border-b-[1.5px] border-b-[#DFE3E8] rounded-none'>
							<TabsTrigger
								value='signin'
								className=' basis-1/2 uppercase text-base px-0 py-2 leading-normal text-[#333333] cursor-pointer
                        data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:text-[#333333] relative 
                        after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:inline-block after:bg-transparent after:translate-y-1/2 data-[state=active]:after:bg-[#3F3F3F]'
							>
								Đăng nhập
							</TabsTrigger>
							<TabsTrigger
								value='signup'
								className=' basis-1/2 uppercase text-base px-0 py-2 leading-normal text-[#333333] cursor-pointer
                        data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:text-[#333333] relative 
                        after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:inline-block after:bg-transparent after:translate-y-1/2 data-[state=active]:after:bg-[#3F3F3F]'
							>
								Đăng ký
							</TabsTrigger>
						</TabsList>
						<div className=' py-6 mt-2'>
							<TabsContent value='signin'>
								<SignIn setOpen={setOpen} />
							</TabsContent>

							<TabsContent value='signup'>
								<SignUp />
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</Box>
		</div>

	)
}

export default AuthTabs