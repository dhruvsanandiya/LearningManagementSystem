using LMS.Application.Contracts.Persistence;
using LMS.Application.DTOs.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CertificatesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CertificatesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("my-certificates")]
    public async Task<IActionResult> GetMyCertificates()
    {
        var userId = User.FindFirstValue("uid");
        var certificates = await _unitOfWork.Certificates.GetCertificatesByStudentAsync(userId!);

        var certificateDtos = certificates.Select(c => new
        {
            c.Id,
            c.CertificateNumber,
            c.IssueDate,
            c.CertificateUrl,
            Course = new
            {
                c.Course.Id,
                c.Course.Title,
                c.Course.ThumbnailUrl
            }
        }).ToList();

        return Ok(ResponseDto<object>.SuccessResponse(certificateDtos));
    }

    [HttpGet("{certificateId}/download")]
    public async Task<IActionResult> DownloadCertificate(int certificateId)
    {
        var userId = User.FindFirstValue("uid");
        var certificate = await _unitOfWork.Certificates.GetByIdAsync(certificateId);

        if (certificate == null || certificate.StudentId != userId)
        {
            return NotFound(ResponseDto<object>.FailureResponse("Certificate not found"));
        }

        // TODO: Implement PDF generation
        return Ok(ResponseDto<string>.SuccessResponse(certificate.CertificateUrl ?? "", "Certificate download URL"));
    }
}


