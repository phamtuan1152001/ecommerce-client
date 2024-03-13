"use client"
import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSnapshot } from "valtio"
import config from "../../../../../config/config"
import state from "@/store"
import { download } from '../../../../../assets/index'
import { downloadCanvasToImage, reader } from '../../../../../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../../../../../config/constants'
import { fadeAnimation, slideAnimation } from "../../../../../config/motion"
import { AIPicker, FilePicker, ColorPicker, Tab, CustomButton } from "../../../../../components/index"
import { useRouter } from "next/navigation"
import CanvasModel from "@/canvas"
import Image from "next/image"
import { Container } from "@/components/ui/container"

type DecalTypeKey = 'logo' | 'full';

const Customizer = () => {
  const snap = useSnapshot(state)
  // console.log("state", state);

  const router = useRouter()

  const [file, setFile] = useState("")

  const [prompt, setPrompt] = useState("")
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditotTab, setActiveEditorTab] = useState("")
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditotTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null
    }
  }

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break;
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState: any) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const handleSubmit = async (type: any) => {
    if (!prompt) return alert("Please enter a prompt")

    try {
      // call our backend to generate an ai image
      setGeneratingImg(true)
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      })
      const data = await response.json()
      // console.log("data", data);

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab("")
    }
  }
  /* Design a simple modern logo icon using geometric shapes and a minimalistic color scheme, without any text or lettering */
  /* Create a unique t-shirt texture that has a vintage and distressed look. The texture should be designed to cover the entire front and should have a rough and gritty feel to it. Please use colors such as faded, red, beige, and black to create a rugged and worn-out appearance */

  const handleDecals = (type: DecalTypeKey, result: any) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result


    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const readFile = (type: any) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result)
        setActiveEditorTab("")
      })
  }

  // console.log("activeFilterTab", activeFilterTab)

  return (
    <Container className="my-6">
      <AnimatePresence>
        <div className="flex flex-row justify-between items-start">
          <motion.div
            key={"custom"}
            className=""
            {...slideAnimation("left")}
          >
            <div className="flex items-center">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab, index) => (
                  <Tab
                    keyId={`${tab.name}-${index}`}
                    tab={tab}
                    handleClick={() => {
                      setActiveEditorTab(tab.name)
                    }}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <div className="">
            <CanvasModel />
          </div>
          <motion.div className="" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go back"
              handleClick={() => {
                state.intro = true
                setTimeout(() => {
                  router.push("/")
                }, 500)
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </div>
        <motion.div
          className="filtertabs-container mt-4"
          {...slideAnimation("up")}
        >
          {FilterTabs.map((tab, index) => (
            <Tab
              keyId={`${tab.name}-${index}`}
              tab={tab}
              isFilterTab
              // isActiveTab={activeFilterTab[tab.name]}
              isActiveTab={tab.name === "logoShirt" ? state.isLogoTexture : state.isFullTexture}
              handleClick={() => {
                handleActiveFilterTab(tab.name)
              }}
            />
          ))}
          <button className='download-btn' onClick={downloadCanvasToImage}>
            <Image
              src={download}
              alt='download_image'
              priority
              className='w-3/5 h-3/5 object-contain'
            />
          </button>
        </motion.div>
      </AnimatePresence>
    </Container>
  )
}

export default Customizer