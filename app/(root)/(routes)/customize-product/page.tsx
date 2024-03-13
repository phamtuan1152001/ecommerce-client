"use client"
import Image from "next/image";
import ThreeJsLogo from "../../../../public/threejs.png"
/*  */
import { motion, AnimatePresence } from "framer-motion"
import { useSnapshot } from "valtio";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../../../../config/motion'

import state from "@/store";

import { CustomButton } from "../../../../components/index";
import { useRouter } from "next/navigation";

const CustomizeProduct = () => {
  const snap = useSnapshot(state)
  const router = useRouter()
  // console.log("state", state);


  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <Image
              src={ThreeJsLogo}
              alt="logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT
              </h1>
            </motion.div>
          </motion.div>

          <motion.div {...headContentAnimation} className="flex flex-col gap-5">
            <p className="max-w-md font-normal text-gray-600 text-base ">
              Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "}and define your own style
            </p>

            <CustomButton
              type="filled"
              title="Customize It"
              handleClick={() => {
                state.intro = false
                setTimeout(() => {
                  router.push("/customize-product/customize-detail-product")
                }, 1300)
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default CustomizeProduct