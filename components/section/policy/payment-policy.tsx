const PaymentPolicy = () => {
  return (
    <div>
      <h1 className="text-xl font-bold color-[#181818]">Chính sách thanh toán</h1>
      <p className="text-base font-normal color-[#202020] py-2">
        Có 3 hình thức thanh toán, khách hàng có thể lựa chọn hình thức thuận tiện và phù hợp với mình nhất:
      </p>
      <ol className="py-2 ml-3">
        <li className="text-base font-normal color-[#202020] py-1">
          Cách 1: Thanh toán tiền mặt trực tiếp địa chỉ của chúng tôi: Khách hàng mua hàng tại địa điểm kinh doanh của chúng tôi, tại đây KH có thể thanh toán trực tiếp.
        </li>
        <li className="text-base font-normal color-[#202020] py-1">
          Cách 2: Thanh toán khi nhận hàng (COD): Với hình thức này khách hàng xem hàng tại nhà, thanh toán tiền mặt cho nhân viên giao nhận hàng
        </li>
        <li className="text-base font-normal color-[#202020] py-1">
          Cách 3: Chuyển khoản trước: Quý khách chuyển khoản trước, sau đó chúng tôi tiến hành giao hàng theo thỏa thuận hoặc hợp đồng với Quý khách.
        </li>
      </ol>
      <p className="text-base color-[#202020] py-1 font-bold">Thông tin tài khoản:</p>
      <p className="text-base color-[#202020] py-2 font-bold">Lưu ý</p>
      <p className="text-base font-normal color-[#202020] py-2">Nội dung chuyển khoản : ghi rõ Số điện thoại hoặc Số đơn hàng</p>
      <p className="text-base font-normal color-[#202020] py-2">Sau khi chuyển khoản, chúng tôi sẽ liên hệ xác nhận và tiến hành giao hàng.</p>
      <p className="text-base font-normal color-[#202020] py-2">Nếu sau thời gian thỏa thuận mà chúng tôi không giao hàng hoặc không phản hồi lại, quý khách có thể gửi khiếu nại trực tiếp về địa chỉ trụ sở </p>
      <p className="text-base font-normal color-[#202020] py-2">Đối với khách hàng có nhu cầu mua số lượng lớn để kinh doanh hoặc buôn sỉ vui lòng liên hệ trực tiếp với chúng tôi để có chính sách giá cả hợp lý. Và việc thanh toán sẽ được thực hiện theo hợp đồng.</p>
      <p className="text-base color-[#202020] py-2 font-bold">Chúng tôi cam kết kinh doanh minh bạch, hợp pháp, bán hàng chất lượng, có nguồn gốc</p>
    </div>
  )
}

export default PaymentPolicy