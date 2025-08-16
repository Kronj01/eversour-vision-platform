# Deployment Guide for Bluehost

## Prerequisites

1. **Bluehost Account**: Ensure you have an active Bluehost hosting account
2. **Domain Setup**: Configure your domain to point to Bluehost servers
3. **Supabase Project**: Your Supabase project is already configured with ID: `hzgscfjfhezutlyvkbyw`

## Deployment Steps

### 1. Build the Project

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### 2. Upload Files to Bluehost

1. **Access cPanel**: Log into your Bluehost account and open cPanel
2. **File Manager**: Navigate to File Manager
3. **Upload Build**: 
   - Go to `public_html` directory (or your domain's folder)
   - Upload all files from the `dist` folder
   - Ensure the `.htaccess` file is uploaded to handle SPA routing

### 3. Database Configuration

Your Supabase database is already configured with:
- **Project URL**: `https://hzgscfjfhezutlyvkbyw.supabase.co`
- **Anon Key**: Already set in the client configuration
- **All tables created** with proper RLS policies
- **Storage buckets** configured for file uploads

### 4. Environment Configuration

#### Supabase Settings (Required)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/hzgscfjfhezutlyvkbyw/auth/providers)
2. Under **Authentication > URL Configuration**:
   - **Site URL**: Set to your Bluehost domain (e.g., `https://yourdomain.com`)
   - **Redirect URLs**: Add your domain URL

#### CORS Configuration
The application is configured to work with CORS headers for API requests.

### 5. File Structure on Bluehost

Your `public_html` should contain:
```
public_html/
├── index.html
├── assets/
│   ├── css files
│   └── js files
├── .htaccess (important for SPA routing)
├── robots.txt
├── site.webmanifest
└── other static assets
```

### 6. SSL Certificate

1. **Enable SSL**: In cPanel, go to SSL/TLS and enable "Force HTTPS Redirect"
2. **Let's Encrypt**: Bluehost provides free SSL certificates

### 7. Performance Optimization

The `.htaccess` file includes:
- **Gzip compression** for faster loading
- **Browser caching** for static assets
- **Security headers** for protection

### 8. Verification Steps

1. **Visit your domain**: Check if the site loads correctly
2. **Test authentication**: Try signing up/logging in
3. **Check admin panel**: Access `/admin` with admin credentials
4. **Test contact form**: Submit a contact form to verify database connectivity
5. **Monitor console**: Check browser console for any errors

### 9. Admin Access

Admin access is configured for:
- **Email**: `suryanshj83@gmail.com`
- **Access**: Visit `/admin` after logging in

### 10. Troubleshooting

#### Common Issues:

1. **404 Errors on Routes**:
   - Ensure `.htaccess` file is uploaded and mod_rewrite is enabled

2. **Authentication Issues**:
   - Check Supabase URL configuration
   - Verify redirect URLs in Supabase dashboard

3. **Database Connection Issues**:
   - Confirm Supabase project is active
   - Check API keys and URLs

4. **CORS Errors**:
   - Verify domain is added to Supabase allowed origins
   - Check `.htaccess` CORS headers

#### Support Resources:
- [Bluehost Support](https://www.bluehost.com/help)
- [Supabase Documentation](https://supabase.com/docs)

## Post-Deployment

### Features Available:
✅ **Complete authentication system**
✅ **Admin dashboard** with comprehensive management
✅ **Real-time analytics** tracking
✅ **Contact form** with database storage
✅ **File upload** system
✅ **SEO optimization**
✅ **Performance monitoring**
✅ **Marketing automation**
✅ **Content management**
✅ **Blog system**
✅ **Newsletter management**

### Next Steps:
1. **Configure email services** if needed (Resend integration available)
2. **Set up monitoring** and alerts
3. **Regular backups** of Supabase data
4. **Performance monitoring** using built-in analytics

Your platform is now production-ready and fully deployed on Bluehost!