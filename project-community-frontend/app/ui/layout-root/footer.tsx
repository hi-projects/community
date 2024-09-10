export function Footer(){
	console.log("Rendered <Footer/>.")
    return (
        <footer className="bg-dark">
			<div className="container">
				<div className="row">
					{/** 二维码 */}
					<div className="col-4 qrcode">
						<img src="https://uploadfiles.nowcoder.com/app/app_download.png" width={136} className="img-thumbnail" alt="二维码" />
					</div>
					<div className="col-8 detail-info">
						<div className="row">
							<div className="col">
								<ul className="nav">
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<ul className="nav btn-group-vertical company-info">

								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
    )
    
}