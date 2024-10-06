package org.scrollSystem.exception;

import org.scrollSystem.exception.ValidationException;
import org.scrollSystem.response.DefaultResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class ExceptionHandle {

    @ExceptionHandler(value = ValidationException.class)
    public ResponseEntity<DefaultResponse<Object>> exception(ValidationException exception) {
        return DefaultResponse.error(exception.getMessage());
    }

    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public ResponseEntity<DefaultResponse<Object>> exception(MissingServletRequestParameterException exception) {
        return DefaultResponse.error("can not make empty param " + exception.getParameterName());
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<DefaultResponse<Object>> exception(Exception exception) {
        if (exception instanceof ClientAbortException) {
            return null;
        }
        log.error("exception: ", exception);
        return DefaultResponse.error("Having errors, please try again in another time");
    }

    @ExceptionHandler(value = MissingRequestHeaderException.class)
    public ResponseEntity<DefaultResponse<Object>> exception(MissingRequestHeaderException exception) {
        return new ResponseEntity<>(DefaultResponse.<Object>builder()
                .success(Boolean.FALSE)
                .message("Required header param " + exception.getHeaderName())
                .build(), HttpStatus.OK);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<DefaultResponse<Object>> exception(AccessDeniedException exception) {
        return DefaultResponse.errorAccessDeny(exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<DefaultResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        String message = "";

        for (Map.Entry entry: errors.entrySet()) {
            return DefaultResponse.error((String) entry.getValue());
        }

        return DefaultResponse.error("Having errors, please try again in another time");
    }
}
