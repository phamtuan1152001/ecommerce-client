import CustomButton from "./custom-button"
interface AIPickerProps {
  prompt: any,
  setPrompt: any,
  generatingImg: boolean,
  handleSubmit: (type: string) => void
}

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }: AIPickerProps) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-text-area"
        placeholder="Ask AI"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg
          ? (
            <CustomButton
              type="outline"
              title="Asking AI..."
              customStyles="text-xs"
              handleClick={() => { }}
            />
          )
          : (
            <>
              <CustomButton
                type="outline"
                title="AI Logo"
                handleClick={() => {
                  handleSubmit('logo')
                }}
                customStyles="text-xs"
              />
              <CustomButton
                type="filled"
                title="AI Full"
                handleClick={() => {
                  handleSubmit('full')
                }}
                customStyles="text-xs"
              />
            </>
          )}
      </div>
    </div>
  )
}

export default AIPicker