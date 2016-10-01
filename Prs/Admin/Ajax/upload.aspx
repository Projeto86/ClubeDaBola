<%@ Import Namespace="ASPJPEGLib" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Web" %>
<script language="c#" runat="server">

string ImgTmp = "";
string ImgGuid = "";

string FornecedorID = "";
string EventoID = "";
string AlbumID = "";

string PathUser = "";
string PathEvento = "";
string PathAlbum = "";
string PathAlbumFull = "";
string PathAlbumTmp = "";

void Salvar(int largura, int altura){
	IASPJpeg jpeg = new ASPJpeg();
	jpeg.Open( PathAlbumTmp+ImgTmp );
	jpeg.PreserveAspectRatio = 1;
	if(jpeg.OriginalWidth > jpeg.OriginalHeight){ jpeg.Width = largura; } else { jpeg.Height = altura; }
	jpeg.Canvas.DrawPNG( 50,50, PathAlbumTmp+ "mdagua.png" );
	jpeg.Save( PathAlbum + "\\"+ImgGuid+"_"+largura+"x"+altura+".jpg" );


	jpeg.Close();
	jpeg = null;
}

void Icone(int largura, int altura){
	IASPJpeg jpeg = new ASPJpeg();
	jpeg.Open( PathAlbumTmp+ImgTmp );
	jpeg.PreserveAspectRatio = 1;
	jpeg.Width = largura;
	if(jpeg.Height>altura){ jpeg.Crop(0,0,jpeg.Width,altura); }
	if(jpeg.Height<altura){
		jpeg.Height = altura;
		if(jpeg.Width>largura){
			int diff = (jpeg.Width-largura)/2;
			jpeg.Crop(diff,0,jpeg.Width-diff,jpeg.Height);
		}
	}

	jpeg.Save( PathAlbum + "\\"+ImgGuid+"_"+largura+"x"+altura+".jpg" );
	jpeg.Close();
	jpeg = null;
}

void Page_Load(){
	try{

		ImgGuid = Guid.NewGuid().ToString();

		string path = Server.MapPath("/Up");



		if(!Directory.Exists(path)){ Directory.CreateDirectory(path); }
		if(!Directory.Exists(path+"\\Fotos")){ Directory.CreateDirectory(path+"\\Fotos"); }

		PathUser = path + "\\Fotos";
		PathAlbum = PathUser;
		PathAlbumFull = PathAlbum + "\\Full\\";
		PathAlbumTmp = PathAlbum + "\\Tmp\\";

		if(!Directory.Exists(PathUser)){ Directory.CreateDirectory(PathUser); }
		if(!Directory.Exists(PathAlbum)){ Directory.CreateDirectory(PathAlbum); }
		if(!Directory.Exists(PathAlbumFull)){ Directory.CreateDirectory(PathAlbumFull); }
		if(!Directory.Exists(PathAlbumTmp)){ Directory.CreateDirectory(PathAlbumTmp); }

		HttpPostedFile up = Request.Files["Filedata"];

		up.SaveAs(PathAlbumTmp+up.FileName);

		ImgTmp = up.FileName;

		Icone(120, 120);
		Salvar(800, 600);

		File.Copy( PathAlbumTmp+ImgTmp , PathAlbumFull + ImgGuid + Path.GetExtension(PathAlbumTmp+ImgTmp) );

		try{ File.Delete( PathAlbumTmp+ImgTmp ); } catch { }

		Response.StatusCode = 200;
		//Response.Write(DateTime.Now.ToString("yyyyMMddHHmmssfff"));
		Response.Write(PathAlbumTmp+ "mdagua.png");

	}
	catch (Exception ex)
	{
	   // If any kind of error occurs return a 500 Internal Server error
	   Response.StatusCode = 500;
	   Response.Write(ex);

	}


}
</script>
