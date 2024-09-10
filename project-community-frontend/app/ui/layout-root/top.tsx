

export default function Top(){
    return (
        <div className="position-relative">
		    <ul className="nav nav-tabs mb-3">
		    	<li className="nav-item">
		    		<a className="nav-link active" href="#">最新</a>
		    	</li>
		    	<li className="nav-item">
		    		<a className="nav-link" href="#">最热</a>
		    	</li>
		    </ul>
		    <button type="button" className="btn btn-primary btn-sm position-absolute rt-0" data-toggle="modal" data-target="#publishModal">我要发布</button>
		</div>
    );
}