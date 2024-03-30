"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSnapshot } from "valtio"
import { AnimatePresence, motion } from "framer-motion"

// @constants
import config from "../../../../config/config"
import state from "@/store"
import { downloadCanvasToImage, reader } from '../../../../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../../../../config/constants'
import { fadeAnimation, slideAnimation } from "../../../../config/motion"

// @img and icon
import { download } from '../../../../assets/index'

// @components
import CanvasModel from "@/canvas"
import { AIPicker, FilePicker, ColorPicker, Tab, CustomButton } from "../../../../components/index"
import { Container } from "@/components/ui/container"

// @service
import apiMethod from "@/utility/ApiMethod"

// @type
import { DecalTypeKey } from "@/types"
import DialogCustomizedProduct from "@/components/dialog-customized-product"

const Customizer = () => {
  const snap = useSnapshot(state)
  // console.log("state", state);

  const router = useRouter()

  const [file, setFile] = useState("")

  const [prompt, setPrompt] = useState("")
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditotTab, setActiveEditorTab] = useState("")
  const [activeFilterTab, setActiveFilterTab] = useState<{
    logoShirt: boolean,
    stylishShirt: boolean
  }>({
    logoShirt: true,
    stylishShirt: false
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)

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
      const response: {
        data: {
          retCode: number,
          retText: string,
          photo: string
        }
      } = await apiMethod.post("http://localhost:3002/dall-e/generate-image-by-text", {
        prompt
      })

      handleDecals(type, `data:image/png;base64,${response.data.photo}`)
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab("")
    }
  }

  const handleDecals = (type: DecalTypeKey, result: string) => {
    const decalType = DecalTypes[type]

    if (type === "logo") {
      state.logoDecal = result
    } else {
      state.fullDecal = result
    }
    // state[decalType.stateProperty] = result

    if (!((activeFilterTab as any)[decalType.filterTab])) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const readFile = (type: DecalTypeKey) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result)
        setActiveEditorTab("")
      })
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container className="my-6">
      <AnimatePresence>
        <div className="flex flex-row justify-between items-start">
          <div className="flex items-center">
            <div className="editortabs-container tabs">
              {EditorTabs.map((tab, index) => {
                return (
                  <React.Fragment key={index}>
                    <Tab
                      keyId={`${tab.name}-${index}`}
                      tab={tab}
                      handleClick={() => {
                        setActiveEditorTab(tab.name)
                      }}
                    />
                  </React.Fragment>
                )
              })}
              {generateTabContent()}
            </div>
          </div>
          <div className="">
            <CanvasModel />
          </div>
          <CustomButton
            type="filled"
            title="Create customized product"
            handleClick={() => {
              // state.intro = true
              // setTimeout(() => {
              //   router.push("/")
              // }, 500)
              const canvas = document.querySelector("canvas");
              const dataURL = (canvas as any).toDataURL("image/png");
              // console.log("dataUrl", dataURL)
              handleOpen()
            }}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm max-w-[100px]"
          />
        </div>
        <div
          className="filtertabs-container mt-4"
        >
          {FilterTabs.map((tab, index) => {
            return (
              <React.Fragment key={index}>
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
              </React.Fragment>
            )
          })}
          <button className='download-btn' onClick={downloadCanvasToImage}>
            <Image
              src={download}
              alt='download_image'
              priority
              className='w-3/5 h-3/5 object-contain'
            />
          </button>
        </div>
      </AnimatePresence>

      <DialogCustomizedProduct
        isOpen={isOpen}
        handleOpen={handleOpen}
      />
    </Container>
  )
}

export default Customizer