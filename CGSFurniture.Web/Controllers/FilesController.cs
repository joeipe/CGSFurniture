using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CGSFurniture.Web.Controllers
{
    public class FilesController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get(string id)
        {
            MemoryStream ms = new MemoryStream();
            HttpContext context = HttpContext.Current;
            //Limit access only to images folder at root level  
            string filePath = context.Server.MapPath(string.Concat("~/App_Data/Tmp/FileUploads/", id));
            string extension = Path.GetExtension(id);
            if (File.Exists(filePath))
            {
                if (!string.IsNullOrWhiteSpace(extension))
                {
                    extension = extension.Substring(extension.IndexOf(".") + 1);
                }
                ImageFormat format = GetImageFormat(extension);
                //If invalid image file is requested the following line will throw an exception  
                using (Bitmap bitmap = new Bitmap(filePath))
                {
                    bitmap.Save(ms, format != null ? format as ImageFormat : ImageFormat.Bmp);
                }
                //new Bitmap(filePath).Save(ms, format != null ? format as ImageFormat : ImageFormat.Bmp);
            }
            //else
            //{
            //    new Bitmap(context.Server.MapPath("~/App_Data/Tmp/FileUploads/fallback.png")).Save(ms, ImageFormat.Png);
            //}
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(ms.ToArray());
            //result.Content.Headers.ContentType = new MediaTypeHeaderValue(string.Format("image/{0}", Path.GetExtension(id)));
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/BMP");
            ms.Dispose();
            return result;
        }

        [HttpPost] // This is from System.Web.Http, and not from System.Web.Mvc
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = GetMultipartProvider();
            var result = await Request.Content.ReadAsMultipartAsync(provider);

            // On upload, files are given a generic name like "BodyPart_26d6abe1-3ae1-416a-9429-b35f15e6e5d5"
            // so this is how you can get the original file name
            var originalFileName = GetDeserializedFileName(result.FileData.First());

            // uploadedFileInfo object will give you some additional stuff like file length,
            // creation time, directory name, a few filesystem methods etc..
            var uploadedFileInfo = new FileInfo(result.FileData.First().LocalFileName);

            // Through the request response you can return an object to the Angular controller
            // You will be able to access this in the .success callback through its data attribute
            // If you want to send something to the .error callback, use the HttpStatusCode.BadRequest instead
            //string extension = Path.GetExtension(originalFileName);
            var returnData = uploadedFileInfo.Name;
            return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
        }

        [HttpDelete]
        public async Task<HttpResponseMessage> Delete(string id)
        {
            HttpContext context = HttpContext.Current;
            string filePath = context.Server.MapPath(string.Concat("~/App_Data/Tmp/FileUploads/", id));
            if (File.Exists(filePath))
            {
                await Task.Factory.StartNew(() =>
                {
                    if (filePath != null)
                        File.Delete(filePath);
                });
            }
            else
            {
                return this.Request.CreateResponse(HttpStatusCode.NotFound);
            }

            var returnData = "deleted successfully";
            return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
        }

        // You could extract these two private methods to a separate utility class since
        // they do not really belong to a controller class but that is up to you
        private MultipartFormDataStreamProvider GetMultipartProvider()
        {
            var uploadFolder = "~/App_Data/Tmp/FileUploads"; // you could put this to web.config
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);
            return new MultipartFormDataStreamProvider(root);
        }

        // Extracts Request FormatData as a strongly typed model
        private object GetFormData<T>(MultipartFormDataStreamProvider result)
        {
            if (result.FormData.HasKeys())
            {
                var unescapedFormData = Uri.UnescapeDataString(result.FormData.GetValues(0).FirstOrDefault() ?? String.Empty);
                if (!String.IsNullOrEmpty(unescapedFormData))
                    return JsonConvert.DeserializeObject<T>(unescapedFormData);
            }

            return null;
        }

        private string GetDeserializedFileName(MultipartFileData fileData)
        {
            var fileName = GetFileName(fileData);
            return JsonConvert.DeserializeObject(fileName).ToString();
        }

        public string GetFileName(MultipartFileData fileData)
        {
            return fileData != null ? fileData.Headers.ContentDisposition.FileName : "";
        }

        public static ImageFormat GetImageFormat(string extension)
        {
            ImageFormat result = null;
            PropertyInfo prop = typeof(ImageFormat).GetProperties().Where(p => p.Name.Equals(extension, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
            if (prop != null)
            {
                result = prop.GetValue(prop) as ImageFormat;
            }
            return result;
        }
    }
}
