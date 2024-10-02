package org.example.request;

import lombok.Data;

@Data
public class BaseLoadMoreRequest {
    private String lastId;
    private Integer limit;
}
