export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
}

/*namespace Healthcare_ERP.Domain.Wrappers;

public class ApiResponse<T>
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public T? Data { get; set; }
    public List<string>? Errors { get; set; }

    // Default constructor for serialization
    public ApiResponse()
    {
    }

    // Static factory method for Success
    public static ApiResponse<T> Success(T data, string message = "Operation completed successfully.")
    {
        return new ApiResponse<T>
        {
            IsSuccess = true,
            Message = message,
            Data = data,
            Errors = null
        };
    }

    // Static factory method for Failure
    public static ApiResponse<T> Failure(List<string> errors, string message = "Operation failed.")
    {
        return new ApiResponse<T>
        {
            IsSuccess = false,
            Message = message,
            Data = default,
            Errors = errors
        };
    }

    // Overload for a single error message
    public static ApiResponse<T> Failure(string error, string message = "Operation failed.")
    {
        return new ApiResponse<T>
        {
            IsSuccess = false,
            Message = message,
            Data = default,
            Errors = new List<string> { error }
        };
    }
}*/