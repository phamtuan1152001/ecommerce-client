const MaintainPolicy = () => {
  return (
    <div>
      <h1 className="text-xl font-bold color-[#181818]">Chính sách bảo hành</h1>
      <h2 className="text-lg font-bold color-[#181818] py-2">1. Trường hợp được bảo hành:</h2>
      <p className="text-base font-normal color-[#202020] py-2">
        Sản phẩm vừa được giao không đúng như hình ảnh cung cấp hoặc trên website.
      </p>
      <h2 className="text-lg font-bold color-[#181818] py-2">2. Trường hợp không được bảo hành:</h2>
      <p className="text-base font-normal color-[#202020] py-2">
        Sản phẩm bị trầy xước do quá trình sử dụng lâu ngày
      </p>
      <p className="text-base font-normal color-[#202020] py-2">
        Sản phẩm bị bể móp, biến dạng do bị va đập
      </p>
      <p className="text-base font-normal color-[#202020] py-2">
        Sản phẩm bị bong tem mác của nhà sản suất
      </p>
      <h2 className="text-lg font-bold color-[#181818] py-2">3. Điều kiện đổi trả hàng hoặc hoàn tiền 100%:</h2>
      <p className="text-base font-normal color-[#202020] py-2">
        Sản phẩm phát hiện bị lỗi của nhà sản xuất khi nhận hàng.
      </p>
      <p className="text-base font-normal color-[#202020] py-2">
        Sản phẩm không giống với sản phẩm mà Quý khách đã đặt hàng trên website của chúng tôi.
      </p>
      <p className="text-base font-bold color-[#202020] py-2">
        Lưu ý:
      </p>
      <ol className="py-2 ml-3">
        <li className="text-base font-normal color-[#202020] py-1">
          Khách hàng cần đổi trả hàng trong vòng 02 ngày làm việc tính từ thời điểm quý khách nhận hàng.
        </li>
        <li className="text-base font-normal color-[#202020] py-1">
          Sản phẩm đổi trả cần nguyên vẹn nhãn mác, hộp, bao bì gốc của sản phẩm như khi Quý khách nhận hàng lúc đầu
        </li>
      </ol>
    </div>
  )
}

export default MaintainPolicy;