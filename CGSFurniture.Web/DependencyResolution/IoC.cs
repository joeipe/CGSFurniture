// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IoC.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------


using CGSFurniture.Core.Interfaces.Repository;
using CGSFurniture.Infrastructure.Repository;
using CGSFurniture.Web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.DataHandler.Serializer;
using Microsoft.Owin.Security.DataProtection;
using StructureMap;
using StructureMap.Graph;
using System.Data.Entity;
using System.Web;

namespace CGSFurniture.Web.DependencyResolution {
    public static class IoC {
        public static IContainer Initialize() {
            ObjectFactory.Initialize(x =>
                        {
                            x.Scan(scan =>
                                    {
                                        scan.TheCallingAssembly();
                                        scan.WithDefaultConventions();
                                    });
                            x.For<ICGSFurnitureDBUow>().Use<CGSFurnitureDBUow>();
                            x.For<ISecureDataFormat<AuthenticationTicket>>().Use<SecureDataFormat<AuthenticationTicket>>();
                            x.For<IDataSerializer<AuthenticationTicket>>().Use<TicketSerializer>();
                            x.For<IDataProtector>().Use(() => new DpapiDataProtectionProvider().Create("ASP.NET Identity"));
                            x.For<ITextEncoder>().Use<Base64UrlTextEncoder>();
                            x.For<IRoleStore<IdentityRole, string>>().Use<RoleStore<IdentityRole>>();

                            x.For<Microsoft.AspNet.Identity.IUserStore<ApplicationUser>>().Use<Microsoft.AspNet.Identity.EntityFramework.UserStore<ApplicationUser>>();
                            x.For<System.Data.Entity.DbContext>().Use(() => new ApplicationDbContext());
                        });
            return ObjectFactory.Container;
        }
    }
}